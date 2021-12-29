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
}

module.exports = PetsDAO;
