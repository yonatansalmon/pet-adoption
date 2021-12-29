const app = require('./server');
const PORT = process.env.PORT || 8000;
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://admin:admin@pet-adoption-cluster.jeooq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const UsersDAO = require('./DAO/usersDAO');
const PetsDAO = require('./DAO/petsDAO');

// Database Name
const dbName = 'pet-adoption';

async function init() {
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const { state } = client.topology.s;
  if (state === 'connected') {
    console.log('Successfully connected to DB');
    UsersDAO.injectConnection(client);
    PetsDAO.injectConnection(client);

    app.listen(PORT, () => {
      console.log(`App is listening on http://localhost:${PORT}`);
    });
  }
}

init();
