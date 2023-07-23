const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/auth", require("./auth"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comment"));
router.use("/api", require("./api"));
router.use("/likes", require("./like"));
router.use("/friends", require("./friends"));

module.exports = router;
