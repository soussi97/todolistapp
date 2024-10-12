const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model defined

const router = express.Router();

// Sign Up Route
router.post('/signup', async (req, res) => {
  console.log('Signup request received:', req.body);
  try {
    const { username, email, password } = req.body;

    // Check if the JWT_SECRET is loaded
    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log('Signup successful, token generated:', token);
    res.status(201).json({ token });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(400).json({ message: 'Error signing up', error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  console.log('Login request received:', req.body);
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.error('User with given email not found');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('User found:', user);

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Password does not match');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    console.log('JWT_SECRET before signing:', process.env.JWT_SECRET);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log('Login successful, token generated:', token);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});


// Middleware for Authenticating Token
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Auth middleware, token received:', token);
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Save the decoded user data to request object
    console.log('Token successfully verified:', decoded);
    next();
  } catch (error) {
    console.error('Unauthorized error:', error);
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

// Get User Profile
router.get('/profile', auth, async (req, res) => {
  console.log('Profile request received for user:', req.user);
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving profile:', error);
    res.status(500).json({ message: 'Error retrieving profile', error: error.message });
  }
});

module.exports = router;
