const router = require("express").Router();

const connection = require("../../database");

router.get("/getTTRPG", (req, res) => {
    try {
        const sqlTTRPG = "SELECT * FROM ttrpg";
        connection.query(sqlTTRPG, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;