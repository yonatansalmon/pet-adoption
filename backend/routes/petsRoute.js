const express = require('express');
const router = express.Router();
const PetsController = require('../controllers/petsController');
const { verifyToken } = require('../middleware/authMiddleware');
const { filterSearch } = require('../middleware/petsMiddleware');
const { upload, uploadToCloudinary } = require('../middleware/imagesMiddleware');
router.get('/all', verifyToken, PetsController.getAllPetsController);
router.get('/', verifyToken, filterSearch, PetsController.getSearchedPetsController);
router.get('/:petId', PetsController.getPetByIdController);
router.get('/mypets/:userId', PetsController.getMyPets);
router.post('/:petId/adopt', verifyToken, PetsController.adoptFosterController);
router.put('/:petId/save', verifyToken, PetsController.savePet);

router.post('/add', upload.single('picture'), uploadToCloudinary, verifyToken, PetsController.addPetController);

module.exports = router;
