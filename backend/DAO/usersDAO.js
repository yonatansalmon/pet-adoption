const { ObjectId } = require('mongodb');
let usersCollection;

class UsersDAO {
  static async injectConnection(client) {
    if (usersCollection) return;
    try {
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
      console.log(isFostered, isAdopted);
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
}

module.exports = UsersDAO;
