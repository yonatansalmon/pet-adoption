exports.filterSearch = (req, res, next) => {
  const { height, weight, name } = req.query;
  for (let key in req.query) {
    req.query.height = { $lte: Number(height) };
    req.query.weight = { $lte: Number(weight) };
    req.query.name = { $regex: name, $options: 'i' };
    if (req.query[key] === '' || req.query[key] === 'Any') {
      delete req.query[key];
    }
  }

  next();
};
