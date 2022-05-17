const { ObjectId } = require('mongodb');

let petsCollection;

class PetsDAO {
  static async injectConnection(client) {
    if (petsCollection) return;
    try {
      petsCollection = await client.db('pet-adoption').collection('pets');
      // petsCollection.deleteMany({})
      // petsCollection.updateMany({}, {$set: {bio: 'Parturient sit faucibus senectus parturient Lacus gravida porta. Curabitur libero suspendisse fames. Varius magnis tortor tincidunt suscipit pede pulvinar.Nullam vestibulum vehicula. Nascetur ligula tellus massa feugiat primis sagittis hymenaeos hendrerit tellus. Sapien tellus tincidunt conubia.Sapien dis, rutrum class cum accumsan donec lobortis viverra dis primis auctor cursus Habitasse ut tincidunt habitasse rhoncus sapien pede dolor. In egestas commodo.'}})
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
      const queryResult = await petsCollection.updateOne(
        { _id: new ObjectId(petId) },
        { $set: { adoptionStatus: status.charAt(0).toUpperCase() + status.slice(1) } }
      );
      return queryResult;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  static async addRemoveSavedUser(petId, userId, action) {
    try {
      const isAlreadySavedUser = await petsCollection.findOne({ _id: new ObjectId(petId), savedUsers: { $in: [userId] } });
      if (!isAlreadySavedUser && action === 'save') {
        const queryResult = await petsCollection.updateOne({ _id: new ObjectId(petId) }, { $push: { savedUsers: userId } });
        return queryResult.acknowledged;
      }
      if (action === 'unsave') {
        const queryResult = await petsCollection.updateOne({ _id: new ObjectId(petId) }, { $pull: { savedUsers: userId } });
        return queryResult.acknowledged;
      }

      return false;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }


}

module.exports = PetsDAO;
