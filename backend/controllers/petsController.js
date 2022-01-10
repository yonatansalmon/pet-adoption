const PetsDAO = require("../DAO/petsDAO.js");
const UsersDAO = require("../DAO/usersDAO.js");


const getAllPetsController = async (req, res) => {
  try {
    const allPets = await PetsDAO.getAllPets();
    res.send(allPets);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getSearchedPetsController = async (req, res) => {
  try {
    const queryResult = await PetsDAO.getSearchedPets(req.query);
    res.send(queryResult);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getPetByIdController = async (req, res) => {
  try {
    const { petId } = req.params;
    const queryResult = await PetsDAO.getPetById(petId);
    res.send(queryResult);
  } catch (err) {
    res.status(500).send(err);
  }
};

const adoptFosterController = async (req, res) => {
  try {
    const { petId } = req.params;
    const {status, userId} = req.body
    const petData = {petId, status}
    const updateUser = await UsersDAO.updateUserById(userId, petData);
    const updatePetStatus = await PetsDAO.updatePetStatus(petId, status);
    console.log('USER', updateUser)
    console.log('STatus', updatePetStatus)

    res.send({updateUser, updatePetStatus});
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
};


const addPetController = async (req, res) => {
  try {
    const { petId } = req.params;
    const {status, userId} = req.body
    const petData = {petId, status}
    const updatePetStatus = await PetsDAO.addPet(newPet);
    console.log('USER', updateUser)
    console.log('STatus', updatePetStatus)

    res.send({updateUser, updatePetStatus});
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
};





module.exports = {
  getAllPetsController,
  getSearchedPetsController,
  getPetByIdController,
  adoptFosterController,
  addPetController
};
