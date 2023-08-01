const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const config = require('config');
const User = require('../models/user');

// Helper function to generate auth token
const generateAuthToken = (user) => {
  const token = jwt.sign({ userId: user._id }, config.get('jwtToken'), { expiresIn: '1h' });
  return token;
};
// Helper function to extract user ID from token
const getUserIdFromToken = (token) => {
    try {
      const decoded = jwt.verify(token, config.get('jwtToken'));
      return decoded.userId;
    } catch (error) {
      return null;
    }
  };
// User registration
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    user = new User({ email, password: hashedPassword, name });
    await user.save();

    // Generate and return the authentication token
    const token = generateAuthToken(user);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// User login
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Generate and return the authentication token
    const token = generateAuthToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserInfo = async (req, res) => {
    const token = req.header('x-auth-token');
  
    // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
    const userId = getUserIdFromToken(token);
  
    if (!userId) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    try {
      // Find the user in the database
      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return user information (excluding the password)
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };