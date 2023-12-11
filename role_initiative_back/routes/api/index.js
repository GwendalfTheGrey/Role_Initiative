const router = require("express").Router();
const apiUsers = require("./users");
const apiLevels = require("./levels");

router.use("/users", apiUsers);
router.use("/levels", apiLevels);

module.exports = router;