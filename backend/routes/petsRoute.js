const express = require('express');
const router = express.Router();
const PetsController = require('../controllers/petsController');
const { verifyToken } = require('../middleware/authMiddleware');
const { filterSearch } = require('../middleware/petsMiddleware');

router.get('/all', verifyToken, PetsController.getAllPetsController);

router.get('/', verifyToken, filterSearch, PetsController.getSearchedPetsController);

module.exports = router;
