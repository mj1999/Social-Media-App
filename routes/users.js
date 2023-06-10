const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.post('/create',usersController.create);
router.post('/login',usersController.login);
router.get('/profile',usersController.profile);
router.get('/friends',usersController.friendList);

module.exports = router;