const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const authentication = (req, res, next) => {
  const token = req.headers['authorization'];

  if (req.path.includes('/register') || req.path.includes('/login')) {
    return next();
  }
  if (!token)
    return res
      .status(403)
      .send({ message: 'A token is required for authentication' });

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).send({ message: 'Invalid token' });
  }
};

module.exports = authentication;
