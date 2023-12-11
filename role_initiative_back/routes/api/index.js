const router = require("express").Router();
const apiUsers = require("./users");
const apiLevels = require("./levels");
const apiRooms = require("./rooms");

router.use("/users", apiUsers);
router.use("/levels", apiLevels);
router.use("/rooms", apiRooms);

module.exports = router;