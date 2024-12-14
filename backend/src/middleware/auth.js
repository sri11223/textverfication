// middlewares/auth.js
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'MY_SECRET_TOKEN');
    req.userId = decoded.userId; // Store userId from the JWT token payload
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateUser;
