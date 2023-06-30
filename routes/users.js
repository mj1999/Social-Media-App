const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersController = require("../controllers/users_controller");

router.post("/create", usersController.create);
// router.post("/login", usersController.login);
router.get("/profile", passport.checkAuth, usersController.profile);
router.get("/friends", usersController.friendList);
router.post("/profile/update", passport.checkAuth, usersController.update);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/auth/sign-in" }),
  usersController.createSession
);
module.exports = router;
