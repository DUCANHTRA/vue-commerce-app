import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import connectDB from '../config/db.js';
/**
 * Get user by ID (excluding password)
 */
export const getUserById = async (req, res) => {
  try {
    await connectDB();
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
export const registerUser = async (req, res) => {
  try {
    await connectDB();
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
export const loginUser = async (req, res) => {
  try {
    await connectDB();
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid username or password' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      success: true,
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
