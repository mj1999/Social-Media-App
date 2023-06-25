const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth_controller");
const userController = require("../controllers/users_controller");
router.get("/sign-in", authController.auth.signIn);
router.get("/sign-up", authController.auth.signUp);
router.get("/sign-out", userController.destroySession);
module.exports = router;
