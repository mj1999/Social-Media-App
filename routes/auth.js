const express = require("express");
const router = express.Router();
const passport = require("passport");

const authController = require("../controllers/auth_controller");
const userController = require("../controllers/users_controller");

router.get("/sign-in", authController.auth.signIn);
router.get("/sign-up", authController.auth.signUp);
router.get("/sign-out", userController.destroySession);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/sign-in" }),
  userController.createSession
);

module.exports = router;
