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
      console.log(queryParams);
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
}

module.exports = PetsDAO;
