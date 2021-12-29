const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController');
const {doesUserExist, doesEmailExist, hashPassword} = require('../middleware/usersMiddleware')

router.post('/signup', doesUserExist, hashPassword, UsersController.signUp);
router.post('/login', doesEmailExist,  UsersController.login);

module.exports = router;
