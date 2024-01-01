const router = require("express").Router();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../keys");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "gwendalftests@gmail.com",
        pass: "cmpa gkeq zsfs epdr"
    }
});

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
                                    res.status(200).json({ message: "Inscription réussie !" });
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
                    res.json({ ...result[0], userPassword: "", icon: !result[0].icon.data ? null : result[0].icon, GM: result[0].GM === 1, admin: result[0].admin === 1 });
                } else if (bcrypt.compareSync(passwordLogin, result[0].userPassword) && stayConnected) {
                    const token = jsonwebtoken.sign({}, key, {
                        subject: result[0].idUser.toString(),
                        expiresIn: "30d",
                        algorithm: "RS256",
                    });
                    res.cookie("Role_Initiative_Token", token, { maxAge: 1000 * 60 * 60 * 24 * 30 });
                    res.json({ ...result[0], userPassword: "", icon: !result[0].icon.data ? null : result[0].icon, GM: result[0].GM === 1, admin: result[0].admin === 1 });
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
            const keyPubString = keyPub.toString("utf16le");
            const decodedToken = jsonwebtoken.verify(
                Role_Initiative_Token,
                keyPubString,
                {
                    algorithms: "RS256",
                });
            const selectSql =
                "SELECT * FROM users NATURAL JOIN usershavelevels NATURAL JOIN levels WHERE idUser = ?";
            connection.query(selectSql, [decodedToken.sub], (err, result) => {
                if (err) throw err;
                const connectedUser = { ...result[0], userPassword: "", icon: !result[0].icon.data ? false : result[0].icon, GM: result[0].GM === 1, admin: result[0].admin === 1 };
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

router.get("/getUserJoinedRoom/:idUser/:idRoom", (req, res) => {
    try {
        const { idUser, idRoom } = req.params;
        const GMRoomsProfileSql = "SELECT * FROM usersjoinrooms WHERE idUser = ? AND idRoom = ?";
        connection.query(GMRoomsProfileSql, [idUser, idRoom], (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log(error);
    }
});

router.post("/userJoinsRoom", (req, res) => {
    try {
        const { idUser, idRoom } = req.body;
        const userJoinsRoomSql = "INSERT INTO usersjoinrooms (idUser, idRoom) VALUES (?, ?)";
        connection.query(userJoinsRoomSql, [idUser, idRoom], (err, result) => {
            if (err) throw err;
            res.json(req.body);
        });
    } catch (error) {
        console.log(error);
    }
});

router.delete("/userLeavesRoom", (req, res) => {
    try {
        const { idUser, idRoom } = req.body;
        const userLeavesRoomSql = "DELETE FROM usersjoinrooms WHERE idUser = ? AND idRoom = ?";
        connection.query(userLeavesRoomSql, [idUser, idRoom], (err, result) => {
            if (err) throw err;
            res.end();
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/resetPassword/:email", (req, res) => {
    try {
        const email = req.params.email;
        const searchMailSql = "SELECT * FROM users WHERE email = ?";
        connection.query(searchMailSql, [email], (err, result) => {
            if (result.length > 0) {
                const confirmLink = `http://localhost:3000/reset-password?email=${email}`;
                const mailOptions = {
                    from: "gwendalftests@gmail.com",
                    to: email,
                    subject: "Réinitialisation de mot de passe Role Initiative",
                    text: `Cliquez sur le lien pour être redirigé vers la page de réinitialisation de mot de passe : ${confirmLink}`,
                };
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        throw err;
                    } else {
                        res.status(200).json({ message: "Un lien de réinitialisation à été envoyé par email" });
                    }
                });
            } else {
                res.status(400).json("L'email entré n'exite pas dans la base de données");
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json("Une erreur est survenue");
    }
});

router.post("/changePassword", async (req, res) => {
    try {
        const { password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const changePasswordSql = "UPDATE users SET userPassword = ? WHERE email = ?";
        connection.query(changePasswordSql, [hashedPassword, email], (err, result) => {
            if (err) throw err;
            res.status(200).json({ message: "Mot de passe modifié, vous allez être redirigé(e)" });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json("Une erreur est survenue");
    }
});

router.patch("/modifyUser", (req, res) => {
    try {
        const { idUser, username, email, idLevel, icon } = req.body;
        const modifyUserSql = icon ?
        "UPDATE users JOIN usershavelevels ON users.idUser = usershavelevels.idUser SET users.username = ?, users.email = ?, users.icon = ?, usershavelevels.idLevel = ? WHERE users.idUser = ?" :
        "UPDATE users JOIN usershavelevels ON users.idUser = usershavelevels.idUser SET users.username = ?, users.email = ?, usershavelevels.idLevel = ? WHERE users.idUser = ?";
        connection.query(modifyUserSql, icon ? [username, email, icon, idLevel, idUser] : [username, email, idLevel, idUser], (err, result) => {
            if (err) throw err;
            const selectModifiedUserSql = "SELECT * FROM users NATURAL JOIN usershavelevels NATURAL JOIN levels WHERE idUser = ?";
            connection.query(selectModifiedUserSql, [idUser], (err, result) => {
                if (err) throw err;
                if (result.length > 0) {
                    const modifiedUser = { ...result[0], userPassword: "", icon: !result[0].icon.data ? false : result[0].icon, GM: result[0].GM === 1, admin: result[0].admin === 1 };
                    res.json(modifiedUser)
                } else {
                    res.status(404).json("Utilisateur non trouvé")
                }
            })
        })
    } catch (error) {
        console.error(error);
        res.status(500).json("Une erreur est survenue");
    }
});

router.delete("/deleteUser/:idUser", (req, res) => {
    try {
        const idUser = req.params.idUser;
        const deleteUserJoinRoomSql = "DELETE FROM usersjoinrooms WHERE idUser = ?";
        connection.query(deleteUserJoinRoomSql, [idUser], (err, result) => {
            if (err) throw err;
            const selectUserRoomsSql = "SELECT * FROM rooms WHERE idUser = ?";
            connection.query(selectUserRoomsSql, [idUser], (err, result) => {
                if (err) throw err;
                if (result.length > 0) {
                    result.map((room) => {
                        const deleteRoomHaveLevelsSql = "DELETE FROM roomshavelevels WHERE idRoom = ?";
                        connection.query(deleteRoomHaveLevelsSql, [room.idRoom], (err, result) => {
                            if (err) throw err;
                        });
                    });
                }
                const deleteUserRoomsSql = "DELETE FROM rooms WHERE idUser = ?";
                connection.query(deleteUserRoomsSql, [idUser], (err, result) => {
                    if (err) throw err;
                    const deleteUserHaveLevel = "DELETE FROM usershavelevels WHERE idUser = ?";
                    connection.query(deleteUserHaveLevel, [idUser], (err, result) => {
                        if (err) throw err;
                        const deleteUserSql = "DELETE FROM users WHERE idUser = ?";
                        connection.query(deleteUserSql, [idUser], (err, result) => {
                            if (err) throw err;
                            res.clearCookie("Role_Initiative_Token" || "Role_Initiative_Extended_Token");
                            res.status(200).json({ message: "Compte supprimé, vous allez être redirigé(e) !" });
                        });
                    });
                });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ messageError: "Une erreur est survenue" });
    }
});

module.exports = router;