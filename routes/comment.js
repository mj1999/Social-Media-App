const express = require("express");
const router = express.Router();
const passport = require("passport");
const commentController = require("../controllers/comment_controller");

router.post("/create", commentController.createComment);

router.get("/delete", passport.checkAuth, commentController.delete);

module.exports = router;
