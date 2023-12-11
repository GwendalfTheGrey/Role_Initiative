const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "role_initiative_v3",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connecté à la base de données");
});

module.exports = connection;