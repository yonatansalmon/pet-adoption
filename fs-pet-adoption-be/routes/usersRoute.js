
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const { isUserNew, passwordMatch, encryptPassword, auth } = require('../middleware/validateUserInfo')
const { upload } = require('../middleware/imagesMiddleware')
const { userExists } = require('../middleware/userMiddleware')

//Login User
router.post('/login', userExists, UserController.login)

//Create User
router.post('/signup', isUserNew, passwordMatch, encryptPassword, UserController.signup);

//LOG OUT
router.get('/logout', UserController.logout);


//READ - get user by id
router.get('/:id', auth, UserController.getUserByIdParams);

//getSavedPets
router.get('/:id/savedpets', UserController.getSavedPets)
router.get('/:id/fosteredpets', UserController.getFosteredPets)
router.get('/:id/adoptedpets', UserController.getAdoptedPets)



//UPDATE User with formData
router.put('/update', upload.single('image'), auth, UserController.updateUserById);
// router.put('/updateinfo', auth, UserController.updateUserInfo);


router.put('/update/password/:id', auth, passwordMatch, encryptPassword, UserController.updatePassword);



// DELETE
router.delete('/:id', UserController.deleteUserById);


module.exports = router;


