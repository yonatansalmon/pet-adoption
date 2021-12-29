const PetsDAO = require('../DAO/petsDAO.js')

const getAllPetsController = async(req, res) => {
  const allPets = await PetsDAO.getAllPets()
  res.send(allPets);
};

module.exports = { getAllPetsController };
