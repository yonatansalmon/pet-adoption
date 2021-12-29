const express = require('express');
const router = express.Router();
const PetsController = require('../controllers/petsController');

router.get('/', PetsController.getAllPetsController);

module.exports = router;
