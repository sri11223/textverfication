const jwt = require('jsonwebtoken');
const { createError } = require('../utils/errors');

const JWT_SECRET = process.env.JWT_SECRET || 'MY_SECRET_TOKEN';

const authenticate = (req, _res, next) => {
  try {
    const bearer = req.headers.authorization;
    const token = bearer?.startsWith('Bearer ') ? bearer.slice(7) : req.cookies?.accessToken;

    if (!token) {
      throw createError(401, 'Unauthorized');
    }

    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (error) {
    return next(error);
  }
};

const optional = (req, _res, next) => {
  const bearer = req.headers.authorization;
  const token = bearer?.startsWith('Bearer ') ? bearer.slice(7) : req.cookies?.accessToken;

  if (token) {
    try {
      req.user = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return next(createError(401, 'Invalid token'));
    }
  }

  return next();
};

module.exports = {
  authenticate,
  optional,
};
