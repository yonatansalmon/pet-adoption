const bcrypt = require('bcrypt');

const UsersDAO = require('../DAO/usersDAO');

exports.doesUserExist = async (req, res, next) => {
  try {
    const user = await UsersDAO.getUserByEmail(req.body.email);
    if (user) {
      res.status(400).send('User Already Exists');
      return;
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

exports.doesEmailExist = async (req, res, next) => {
  try {
    const user = await UsersDAO.getUserByEmail(req.body.email);
    if (!user) {
      res.status(400).send('Email Does Not Exist');
      return;
    }
    req.body.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

exports.hashPassword = async (req, res, next) => {
  const saltRounds = 10;
  try {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      req.body.hashedPassword = hash;
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};
