const router = require("express").Router();
const apiUsers = require("./users");
const apiLevels = require("./levels");
const apiTTRPG = require("./ttrpg");
const apiRooms = require("./rooms");

router.use("/users", apiUsers);
router.use("/levels", apiLevels);
router.use("/ttrpg", apiTTRPG);
router.use("/rooms", apiRooms);

module.exports = router;