
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const { isUserNew, passwordMatch, encryptPassword, auth } = require('../middleware/validateUserInfo')
const { upload } = require('../middleware/imagesMiddleware')

//Login User
router.post('/login', UserController.Login)

//Create User
router.post('/signup', isUserNew, passwordMatch, encryptPassword, UserController.SignUp);

//LOG OUT
router.get('/logout', UserController.Logout);



//READ - get all users
router.get('/', UserController.getAllUsers);

//READ - get user by id
router.get('/:id', auth, UserController.getUserByIdParams);

//getSavedPets
router.get('/:id/savedpets', UserController.getSavedPets)
router.get('/:id/fosteredpets', UserController.getFosteredPets)
router.get('/:id/adoptedpets', UserController.getAdoptedPets)



//UPDATE User with formData
router.post('/update/', auth, upload.single('image'), UserController.updateUserById);


router.put('/update/password/:id', auth, passwordMatch, encryptPassword, UserController.updatePassword);

router.post('/updateinfo/', auth, UserController.updateUserInfo);


// DELETE
router.delete('/:id', UserController.deleteUserById);


module.exports = router;


