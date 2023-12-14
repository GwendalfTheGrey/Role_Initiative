const router = require("express").Router();

const connection = require("../../database");

router.get("/getUsersJoined", (req, res) => {
    try {
        const usersJoinedSql = "SELECT * FROM usersjoinrooms";
        connection.query(usersJoinedSql, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/getHomeRooms", (req, res) => {
    try {
        const roomsSql = "SELECT idUser, username, icon, idRoom, title, description, TTRPGName, idGenre, levelName FROM users NATURAL JOIN rooms NATURAL JOIN roomshavelevels NATURAL join levels NATURAL JOIN ttrpg NATURAL JOIN ttrpg_ttrpggenres WHERE rooms.onGoing = 0";
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
        const roomsSql = "SELECT idUser, username, icon, idRoom, title, description, TTRPGName, idGenre, levelName FROM users NATURAL JOIN rooms NATURAL JOIN roomshavelevels NATURAL join levels NATURAL JOIN ttrpg NATURAL JOIN ttrpg_ttrpggenres WHERE rooms.onGoing = 0 AND ttrpg_ttrpggenres.idGenre = 1";
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
        const roomsSql = "SELECT idUser, username, icon, idRoom, title, description, TTRPGName, idGenre, levelName FROM users NATURAL JOIN rooms NATURAL JOIN roomshavelevels NATURAL join levels NATURAL JOIN ttrpg NATURAL JOIN ttrpg_ttrpggenres WHERE rooms.onGoing = 0 AND ttrpg_ttrpggenres.idGenre = 2";
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
        const roomsSql = "SELECT idUser, username, icon, idRoom, title, description, TTRPGName, idGenre, levelName FROM users NATURAL JOIN rooms NATURAL JOIN roomshavelevels NATURAL join levels NATURAL JOIN ttrpg NATURAL JOIN ttrpg_ttrpggenres WHERE rooms.onGoing = 0 AND ttrpg_ttrpggenres.idGenre = 3";
        connection.query(roomsSql, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/getRoomDetails/:idRoom", (req, res) => {
    try {
        const idRoom = req.params.idRoom;
        const roomDetailsSql = "SELECT idUser, username, icon, idRoom, title, description, discord, onGoing, TTRPGName, idGenre, idLevel, levelName FROM users NATURAL JOIN rooms NATURAL JOIN roomshavelevels NATURAL join levels NATURAL JOIN ttrpg NATURAL JOIN ttrpg_ttrpggenres WHERE rooms.idRoom = ?";
        connection.query(roomDetailsSql, [idRoom], (err, result) => {
            if (err) throw err;
            res.json(result[0]);
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/getAllRoomsProfile", (req, res) => {
    try {
        const allRoomsProfileSql = "SELECT rooms.idUser, COALESCE(rooms.idRoom, usersjoinrooms.idRoom) AS idRoom, rooms.title, rooms.onGoing, rooms.idTTRPG, ttrpg_ttrpggenres.idTTRPG, ttrpg_ttrpggenres.idGenre, ttrpg.TTRPGName, roomshavelevels.idLevel, levels.levelName, usersjoinrooms.idUser AS joinedIdUser FROM rooms LEFT JOIN ttrpg_ttrpggenres ON rooms.idTTRPG = ttrpg_ttrpggenres.idTTRPG LEFT JOIN usersjoinrooms ON rooms.idRoom = usersjoinrooms.idRoom LEFT JOIN ttrpg ON rooms.idTTRPG = ttrpg.idTTRPG LEFT JOIN roomshavelevels ON rooms.idRoom = roomshavelevels.idRoom LEFT JOIN levels ON levels.idLevel = roomshavelevels.idLevel GROUP BY rooms.idRoom";
        connection.query(allRoomsProfileSql, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/getGMRoomsProfile/:idUser", (req, res) => {
    try {
        const idUser = req.params.idUser;
        const GMRoomsProfileSql = "SELECT rooms.idUser, COALESCE(rooms.idRoom, usersjoinrooms.idRoom) AS idRoom, rooms.title, rooms.onGoing, rooms.idTTRPG, ttrpg_ttrpggenres.idTTRPG, ttrpg_ttrpggenres.idGenre, ttrpg.TTRPGName, roomshavelevels.idLevel, levels.levelName, usersjoinrooms.idUser AS joinedIdUser FROM rooms LEFT JOIN ttrpg_ttrpggenres ON rooms.idTTRPG = ttrpg_ttrpggenres.idTTRPG LEFT JOIN usersjoinrooms ON rooms.idRoom = usersjoinrooms.idRoom LEFT JOIN ttrpg ON rooms.idTTRPG = ttrpg.idTTRPG LEFT JOIN roomshavelevels ON rooms.idRoom = roomshavelevels.idRoom LEFT JOIN levels ON levels.idLevel = roomshavelevels.idLevel WHERE rooms.idUser = ? GROUP BY rooms.idRoom";
        connection.query(GMRoomsProfileSql, [idUser], (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/getPlayerRoomsProfile/:idUser", (req, res) => {
    try {
        const idUser = req.params.idUser;
        const GMRoomsProfileSql = "SELECT rooms.idUser, rooms.idRoom, rooms.title, rooms.onGoing, rooms.idTTRPG, ttrpg_ttrpggenres.idTTRPG, ttrpg_ttrpggenres.idGenre, ttrpg.TTRPGName, roomshavelevels.idLevel, levels.levelName, usersjoinrooms.idRoom, usersjoinrooms.idUser AS joinedIdUser FROM rooms LEFT JOIN ttrpg_ttrpggenres ON rooms.idTTRPG = ttrpg_ttrpggenres.idTTRPG LEFT JOIN usersjoinrooms ON rooms.idRoom = usersjoinrooms.idRoom LEFT JOIN ttrpg ON rooms.idTTRPG = ttrpg.idTTRPG LEFT JOIN roomshavelevels ON rooms.idRoom = roomshavelevels.idRoom LEFT JOIN levels ON levels.idLevel = roomshavelevels.idLevel WHERE usersjoinrooms.idUser = ?";
        connection.query(GMRoomsProfileSql, [idUser], (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log(error);
    }
});

router.patch("/roomDetails/changeOngoing", (req, res) => {
    try {
        const { idRoom, onGoing } = req.body;
        const changeOngoingSql = "UPDATE rooms SET onGoing = ? WHERE idRoom = ?";
        connection.query(changeOngoingSql, [onGoing, idRoom], (err, result) => {
            if (err) throw err;
            res.json(req.body);
        });
    } catch (error) {
        console.log(error);
    }
});

router.post("/createRoom", (req, res) => {
    try {
        const { idUser, title, description, discord, onGoing, idTTRPG, idLevel } = req.body;
        const insertRoomSql = "INSERT INTO rooms (idUser, title, description, discord, idTTRPG, onGoing) VALUES (?, ?, ?, ?, ?, ?)";
        connection.query(insertRoomSql, [idUser, title, description, discord, idTTRPG, onGoing], (err, result) => {
            if (err) throw err;
            const idRoom = result.insertId;
            try {
                const insertRoomLevelSql = "INSERT INTO roomshavelevels (idRoom, idLevel) VALUES (?, ?)";
                connection.query(insertRoomLevelSql, [idRoom, idLevel], (err, result) => {
                    if (err) throw err;
                    res.json({ ...req.body, idRoom: idRoom });
                });
            } catch (error) {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error);
    }
});

router.delete("/deleteRoom/:idRoom", (req, res) => {
    try {
        const idRoom = req.params.idRoom;
        const deleteRoomSql = "DELETE FROM usersjoinrooms WHERE idRoom = ?";
        connection.query(deleteRoomSql, [idRoom], (err, result) => {
            if (err) throw err;
            const deleteRoomSql = "DELETE FROM roomshavelevels WHERE idRoom = ?";
            connection.query(deleteRoomSql, [idRoom], (err, result) => {
                if (err) throw err;
                const deleteRoomSql = "DELETE FROM rooms WHERE idRoom = ?";
                connection.query(deleteRoomSql, [idRoom], (err, result) => {
                    if (err) throw err;
                    res.end();
                });
            });
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;