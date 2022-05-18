const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController');
const { doesUserExist, doesEmailExist, hashPassword } = require('../middleware/usersMiddleware');
const { verifyToken } = require('../middleware/authMiddleWare.js');


router.post('/signup', doesUserExist, hashPassword, UsersController.signUp);
router.post('/login', doesEmailExist, UsersController.login);
router.post('/', verifyToken, UsersController.getCurrentUser);
router.get('/all', verifyToken, UsersController.getAllUsers);
router.get('/:userId', verifyToken, UsersController.getUserById);


module.exports = router;
