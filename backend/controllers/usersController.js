const UsersDAO = require('../DAO/usersDAO');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = (req, res) => {
  const { user, password } = req.body;
  const { firstName, email, hashedPassword } = user;
  bcrypt.compare(password, hashedPassword, function (err, result) {
    if (err) {
      res.status(400).send('Passwords Dont Match');
      return;
    }
    if (result) {
      const token = jwt.sign({ id: user._id }, 'shhhhh');
      res.send({ id: user._id, firstName, token });
    }
  });
};

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, hashedPassword } = req.body;
    const user = await UsersDAO.addUser({ firstName, lastName, email, hashedPassword });
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getCurrentUser = async (req, res) => {
  const { decoded } = req.body;
  const currentUser = await UsersDAO.getCurrentUser(decoded.id);
  res.send(currentUser);
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UsersDAO.getAllUsers();
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const {userId} = req.params
    const user = await UsersDAO.getUserById(userId);
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { getAllUsers, login, signUp, getCurrentUser, getUserById };
