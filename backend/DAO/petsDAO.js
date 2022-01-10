const { ObjectId } = require('mongodb');

let petsCollection;

class PetsDAO {
  static async injectConnection(client) {
    if (petsCollection) return;
    try {
      petsCollection = await client.db('pet-adoption').collection('pets');
      // petsCollection.deleteMany({})
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllPets() {
    try {
      const queryResult = await petsCollection.find().toArray();
      return queryResult;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  static async addPet(pet) {
    try {
      const queryResult = await petsCollection.insertOne(pet);
      return queryResult;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  static async getSearchedPets(queryParams) {
    try {
      const queryResult = await petsCollection.find(queryParams).toArray();
      return queryResult;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  static async getPetById(id) {
    try {
      const queryResult = await petsCollection.findOne({ _id: ObjectId(id) });
      return queryResult;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  static async updatePetStatus(petId, status) {
    try {
      const queryResult = await petsCollection.updateOne({ _id:new ObjectId(petId)}, {$set: {adoptionStatus: status.charAt(0).toUpperCase() + status.slice(1)}});
      return queryResult;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  static async addPet(newPet) {
    try {
      const queryResult = await petsCollection.insertOne({ _id:new ObjectId(petId)}, {$set: {adoptionStatus: status.charAt(0).toUpperCase() + status.slice(1)}});
      return queryResult;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }
}




module.exports = PetsDAO;
