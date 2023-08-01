const jwt = require('jsonwebtoken');
const config = require('config');

// Middleware to verify JWT token
const isAuthenticated = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header('x-auth-token');

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, config.get('jwtToken'));

    // Set the user ID from the token payload in the request object
    req.user = decoded.user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  isAuthenticated,
};
