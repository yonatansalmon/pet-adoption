const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send("Token Required");
    return;
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).send("Invalid Token");
      return;
    }
    req.body.userId = decoded.id;
    next();
  });
};
