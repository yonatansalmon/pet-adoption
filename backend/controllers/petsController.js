const PetsDAO = require('../DAO/petsDAO.js');

const getAllPetsController = async (req, res) => {
  try {
    const allPets = await PetsDAO.getAllPets();
    res.send(allPets);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { getAllPetsController };
