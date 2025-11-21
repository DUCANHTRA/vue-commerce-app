const bcrypt = require('bcrypt');
const User = require("../models/User");

/**
 * Get user by ID (excluding password)
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // exclude password
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Register a new user
 */
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ success: false, message: 'Username already exists' });

    // Create new user (pre-save hook will hash password)
    const user = await User.create({ username, email, password });

    res.status(201).json({ success: true, message: 'Registration successful', userId: user._id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Login user
 */
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid username or password' });

    // Optionally return a JWT token here for auth
    res.json({ success: true, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
