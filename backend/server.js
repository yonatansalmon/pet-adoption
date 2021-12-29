const express = require('express');
const cors = require('cors');
const app = express();

const petsRoute = require('./routes/petsRoute');
const usersRoute = require('./routes/usersRoute');

app.use(express.json());
app.use(cors());

app.use('/pets', petsRoute);

app.use('/users', usersRoute);

module.exports = app;
