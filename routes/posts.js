const express = require("express");
const router = express.Router();
const passport = require("passport");
const postsController = require("../controllers/posts_controller");

router.post("/create", passport.checkAuth, postsController.createPost);
router.post("/delete", passport.checkAuth, postsController.delete);

module.exports = router;
