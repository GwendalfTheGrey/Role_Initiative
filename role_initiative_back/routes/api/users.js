const router = require("express").Router();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../keys");

const connection = require("../../database");

router.get("/checkAdmin", (req, res) => {
    try {
        const sqlAdmin = "SELECT COUNT(admin) 'admin' FROM users WHERE admin = 1";
        connection.query(sqlAdmin, (err, result) => {
            if (err) throw err;
            const checkAdmin = result[0].admin > 0;
            res.json(checkAdmin);
        });
    } catch (error) {
        console.log(error);
    }
});

router.post("/register", (req, res) => {
    const { admin, username, emailRegister, passwordRegister, idLevel, GM } = req.body;
    const verifyEmail = "SELECT * FROM users WHERE email = ?";
    connection.query(verifyEmail, [emailRegister], (err, result) => {
        try {
            if (!result.length) {
                const verifyUsername = "SELECT * FROM users WHERE username = ?";
                connection.query(verifyUsername, [username], async (err, result) => {
                    try {
                        if (!result.length) {
                            const hashedPassword = await bcrypt.hash(passwordRegister, 10);
                            const insertSql = "INSERT INTO users (admin, username, email, userPassword, GM) VALUES (?, ?, ?, ?, ?)";
                            connection.query(insertSql, [admin, username, emailRegister, hashedPassword, GM], (err, result) => {
                                if (err) throw err;
                                const idUser = result.insertId;
                                const insertSql = "INSERT INTO usershavelevels (idUser, idLevel) VALUES (?, ?)";
                                connection.query(insertSql, [idUser, idLevel], (err, result) => {
                                    if (err) throw err;
                                    const selectSql = "SELECT * FROM users NATURAL JOIN levels";
                                    connection.query(selectSql, (err, result) => {
                                        if (err) throw err;
                                        res.json(result[0]);
                                    });
                                    // select SQL unnecessary only for log in front end
                                    // add res.end() after removing
                                });
                            });
                        } else {
                            res.status(400).json("Nom d'utilisateur déjà utilisé");
                        }
                    } catch (error) {
                        res.status(500).json("Une erreur est survenue");
                    }
                });
            } else {
                res.status(400).json("Cet email existe déjà");
            }
        } catch (error) {
            res.status(500).json("Une erreur est survenue");
        }
    });
});

router.post("/login", async (req, res) => {
    const { emailLogin, passwordLogin, stayConnected, admin } = req.body;
    const sqlVerify = admin ? "SELECT * FROM users NATURAL JOIN usershavelevels NATURAL JOIN levels WHERE admin = 1 AND email = ?"
    : "SELECT * FROM users NATURAL JOIN usershavelevels NATURAL JOIN levels WHERE admin = 0 AND email = ?";
    connection.query(sqlVerify, [emailLogin], (err, result) => {
        try {
            if (result.length > 0) {
                if (bcrypt.compareSync(passwordLogin, result[0].userPassword) && !stayConnected) {
                    const token = jsonwebtoken.sign({}, key, {
                        subject: result[0].idUser.toString(),
                        expiresIn: "24h",
                        algorithm: "RS256",
                    });
                    res.cookie("Role_Initiative_Token", token, { maxAge: 1000 * 60 * 60 * 24 });
                    res.json({ ...result[0], userPassword: "", icon: !result[0].icon.data ? null : result.icon, GM: result[0].GM === 1, admin: result[0].admin === 1});
                } else if (bcrypt.compareSync(passwordLogin, result[0].userPassword) && stayConnected) {
                    const token = jsonwebtoken.sign({}, key, {
                        subject: result[0].idUser.toString(),
                        expiresIn: "30d",
                        algorithm: "RS256",
                    });
                    res.cookie("Role_Initiative_Token", token, { maxAge: 1000 * 60 * 60 * 24 * 30 });
                    res.json({ ...result[0], userPassword: "", icon: !result[0].icon.data ? null : result.icon, GM: result[0].GM === 1, admin: result[0].admin === 1});
                } else {
                    res.status(400).json("Email et/ou mot de passe incorrectes");
                }
            } else {
                res.status(400).json("Email et/ou mot de passe incorrectes");
            }
        } catch (error) {
            console.log(error);
            res.status(500).json("Une erreur est survenue");
        }
    });
});

router.get("/connectedUser", (req, res) => {
    const { Role_Initiative_Token } = req.cookies;
    if (Role_Initiative_Token) {
        try {
            const decodedToken = jsonwebtoken.verify(Role_Initiative_Token, key, {
                algorithms: "RS256"
            });
            // Instead of key her should be the keyPub, somehow with keyPub(public key) there is an error stating "secretOrPublicKey must be an asymmetric key when using RS256"
            // After a long search and many verifications no working solution using keyPub(public key) was found, somehow just the key(private key) works
            const selectSql =
                "SELECT * FROM users NATURAL JOIN usershavelevels NATURAL JOIN levels WHERE idUser = ?";
            connection.query(selectSql, [decodedToken.sub], (err, result) => {
                if (err) throw err;
                const connectedUser = { ...result[0], userPassword: "", icon: !result[0].icon.data ? false : result.icon, GM: result[0].GM === 1, admin: result[0].admin === 1};
                if (connectedUser) {
                    res.json(connectedUser);
                } else {
                    res.json(null);
                }
            });
        } catch (error) {
            console.log(error);
            res.json(null);
        }
    } else {
        res.json(null);
    }
});

router.delete("/logout", (req, res) => {
    res.clearCookie("Role_Initiative_Token" || "Role_Initiative_Extended_Token");
    console.log("Disconnecting");
    res.end();
});

module.exports = router;