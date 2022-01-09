const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send('Token Required');
    return;
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'shhhhh', (err, decoded) => {
    if (err) {
      res.status(401).send('Invalid Token');
      return;
    }
    console.log(decoded)
    req.body.userId = decoded.id;
    next();
  });
};
