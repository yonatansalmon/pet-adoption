const { ObjectId } = require('mongodb');
let usersCollection;
let petsCollection;

class UsersDAO {
  static async injectConnection(client) {
    if (usersCollection) return;
    try {
      petsCollection = await client.db('pet-adoption').collection('pets');

      usersCollection = await client.db('pet-adoption').collection('users');
      // usersCollection.deleteMany({})
    } catch (err) {
      console.log(err);
    }
  }

  static async addUser(user) {
    try {
      const queryResult = await usersCollection.insertOne(user);
      return queryResult;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  static async getUserByEmail(email) {
    try {
      const queryResult = await usersCollection.findOne({ email: email });
      return queryResult;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  static async getUserById(id) {
    try {
      const queryResult = await usersCollection.findOne({
        _id: new ObjectId(id),
      });
      return queryResult;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  static async updateUserById(userId, petData) {
    try {
      const { status, petId } = petData;
      const isFostered = await usersCollection.findOne({ _id: new ObjectId(userId), fostered: { $in: [petId] } });
      const isAdopted = await usersCollection.findOne({ _id: new ObjectId(userId), adopted: { $in: [petId] } });
      if (status === 'adopted' && isFostered) {
        usersCollection.updateOne({ _id: new ObjectId(userId) }, { $pull: { fostered: petId } });
      }

      if (status === 'fostered' && isAdopted) {
        usersCollection.updateOne({ _id: new ObjectId(userId) }, { $pull: { adopted: petId } });
      }

      const queryResult = await usersCollection.updateOne({ _id: new ObjectId(userId) }, { $push: { [status]: petId } }, { upsert: true });
      return queryResult;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  static async addRemoveSavedPet(petId, userId, action) {
    try {
      const isPetExist = await usersCollection.findOne({ _id: new ObjectId(userId), savedPets: { $in: [petId] } });
      if (!isPetExist && action === 'save') {
        const queryResult = await usersCollection.updateOne({ _id: new ObjectId(userId) }, { $push: { savedPets: petId } });
        return queryResult.acknowledged;
      }

      if (action === 'unsave') {
        const queryResult = await usersCollection.updateOne({ _id: new ObjectId(userId) }, { $pull: { savedPets: petId } });
        return queryResult.acknowledged;
      }

      return false;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  static async getMyPets(userId) {
    try {
      const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
      let { savedPets, fostered, adopted } = user;

      const mySavedPets =
        savedPets &&
        (await Promise.all(
          savedPets.map(async (petId) => {
            return await petsCollection.findOne({ _id: new ObjectId(petId) });
          })
        ));

      const myFosteredPets =
        fostered &&
        (await Promise.all(
          fostered.map(async (petId) => {
            return await petsCollection.findOne({ _id: new ObjectId(petId) });
          })
        ));

      const myAdoptedPets =
        adopted &&
        (await Promise.all(
          adopted.map(async (petId) => {
            return await petsCollection.findOne({ _id: new ObjectId(petId) });
          })
        ));

      return { mySavedPets, myFosteredPets, myAdoptedPets };
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  static async getUserByEmail(email) {
    try {
      const queryResult = await usersCollection.findOne({ email: email });
      return queryResult;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  static async getAllUsers() {
    try {
      const queryResult = await usersCollection.find().toArray();
      return queryResult;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  static async editUser(userId, userData) {
    try {
      const queryResult = await usersCollection.updateOne({ _id: new ObjectId(userId) }, { $set: { ...userData } }, { upsert: true });
      return queryResult;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }
}

module.exports = UsersDAO;
