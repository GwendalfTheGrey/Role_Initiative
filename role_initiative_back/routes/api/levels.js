const router = require("express").Router();

const connection = require("../../database");

router.get("/getLevels", (req, res) => {
    try {
        const sqlLevels = "SELECT * FROM levels";
        connection.query(sqlLevels, (err, result) => {
            if(err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;