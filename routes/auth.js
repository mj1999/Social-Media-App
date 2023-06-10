const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth_controller');


router.get('/sign-in',authController.auth.signIn);
router.get('/sign-up',authController.auth.signUp);

module.exports = router;