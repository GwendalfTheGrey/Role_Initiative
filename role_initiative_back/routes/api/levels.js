const router = require("express").Router();

const connection = require("../../database");

router.get("/getLevels", (req, res) => {
    try {
        const sqlLevels = "SELECT * FROM levels";
        connection.query(sqlLevels, (err, result) => {
            if(err) throw err;
            const levels = result;
            res.json(levels);
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;