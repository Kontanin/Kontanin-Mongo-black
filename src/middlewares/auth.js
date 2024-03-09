const jwt = require('jsonwebtoken');
const CustomError = require('../errors');

const SECRET_KEY = process.env.SECRET_KEY;

const authentication = (req, res, next) => {
  const token = req.headers['authorization'];

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
const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    console.log(roles, 'roles', req.user.role);
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};
module.exports = { authentication, authorizePermissions };
