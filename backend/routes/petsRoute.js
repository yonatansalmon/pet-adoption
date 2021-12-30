const express = require('express');
const router = express.Router();
const PetsController = require('../controllers/petsController');
const {verifyToken} = require('../middleware/authMiddleware')

router.get('/', verifyToken, PetsController.getAllPetsController);

module.exports = router;
