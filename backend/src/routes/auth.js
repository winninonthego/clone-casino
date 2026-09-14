const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Wallet = require('../models/Wallet');
const { generateToken } = require('../config/jwt');
const { validateEmail, validatePassword, validateUsername } = require('../middleware/validation');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!validateUsername(username)) {
      return res.status(400).json({ error: 'Username must be 3-20 characters' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create user
    const user = await User.create(username, email, password);

    // Create wallet
    await Wallet.create(user.id, 0);

    // Generate token
    const token = generateToken({ id: user.id, email: user.email });

    res.status(201).json({ message: 'User registered successfully', user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await User.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken({ id: user.id, email: user.email });
    res.json({ message: 'Login successful', token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
