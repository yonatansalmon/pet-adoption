const UsersDAO = require('../DAO/usersDAO');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getAllUsers = (req, res) => {
  res.send('Get on Users');
};

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
      res.send({ firstName, email, token });
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

module.exports = { getAllUsers, login, signUp };
