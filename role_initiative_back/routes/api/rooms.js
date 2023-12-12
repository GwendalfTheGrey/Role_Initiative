const router = require("express").Router();

const connection = require("../../database");

router.get("/getUsersJoined", (req, res) => {
    try {
        const usersJoinedSql = "SELECT * FROM usersjoinrooms";
        connection.query(usersJoinedSql, (err, result) => {
            if (err) throw err;
            res.json(result)
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/getHomeRooms", (req, res) => {
    try {
        const roomsSql = "SELECT idUser, username, icon, idRoom, adminCreated, title, description, maxNumberOfParticipants, onGoing, finished, discord, idTTRPG, TTRPGName, idGenre, levelName, idLevel FROM users NATURAL JOIN rooms NATURAL JOIN roomshavelevels NATURAL join levels NATURAL JOIN ttrpg NATURAL JOIN ttrpg_ttrpggenres WHERE rooms.finished = 0 AND rooms.onGoing = 0";
        connection.query(roomsSql, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/getFantasyRooms", (req, res) => {
    try {
        const roomsSql = "SELECT idUser, username, icon, idRoom, adminCreated, title, description, maxNumberOfParticipants, onGoing, finished, discord, idTTRPG, TTRPGName, idGenre, levelName, idLevel FROM users NATURAL JOIN rooms NATURAL JOIN roomshavelevels NATURAL join levels NATURAL JOIN ttrpg NATURAL JOIN ttrpg_ttrpggenres WHERE rooms.finished = 0 AND rooms.onGoing = 0 AND ttrpg_ttrpggenres.idGenre = 1";
        connection.query(roomsSql, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/getSciFiRooms", (req, res) => {
    try {
        const roomsSql = "SELECT idUser, username, icon, idRoom, adminCreated, title, description, maxNumberOfParticipants, onGoing, finished, discord, idTTRPG, TTRPGName, idGenre, levelName, idLevel FROM users NATURAL JOIN rooms NATURAL JOIN roomshavelevels NATURAL join levels NATURAL JOIN ttrpg NATURAL JOIN ttrpg_ttrpggenres WHERE rooms.finished = 0 AND rooms.onGoing = 0 AND ttrpg_ttrpggenres.idGenre = 2";
        connection.query(roomsSql, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/getHorrorAndOtherRooms", (req, res) => {
    try {
        const roomsSql = "SELECT idUser, username, icon, idRoom, adminCreated, title, description, maxNumberOfParticipants, onGoing, finished, discord, idTTRPG, TTRPGName, idGenre, levelName, idLevel FROM users NATURAL JOIN rooms NATURAL JOIN roomshavelevels NATURAL join levels NATURAL JOIN ttrpg NATURAL JOIN ttrpg_ttrpggenres WHERE rooms.finished = 0 AND rooms.onGoing = 0 AND ttrpg_ttrpggenres.idGenre = 3";
        connection.query(roomsSql, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;