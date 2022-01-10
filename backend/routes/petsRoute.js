const express = require("express");
const router = express.Router();
const PetsController = require("../controllers/petsController");
const { verifyToken } = require("../middleware/authMiddleware");
const { filterSearch } = require("../middleware/petsMiddleware");

router.get("/all", verifyToken, PetsController.getAllPetsController);

router.get(
  "/",
  verifyToken,
  filterSearch,
  PetsController.getSearchedPetsController
);

router.get("/:petId", PetsController.getPetByIdController);

router.post("/:petId/adopt", verifyToken, PetsController.adoptFosterController);

router.post('/add', PetsController.addPetController);



module.exports = router;
