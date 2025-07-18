
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const EMAIL_DOMAIN = '@sece.ac.in';

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const cleanEmail = email.toLowerCase().trim();
  if (!cleanEmail.endsWith(EMAIL_DOMAIN)) {
    return res.status(400).json({ message: `Only ${EMAIL_DOMAIN} emails allowed.` });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email: cleanEmail });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new User({ name, email: cleanEmail, password: hashedPassword });
    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Send token and user info
    res.status(201).json({
      token,
      user: {
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Signup Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const cleanEmail = email.toLowerCase().trim();
  if (!cleanEmail.endsWith(EMAIL_DOMAIN)) {
    return res.status(400).json({ message: `Only ${EMAIL_DOMAIN} emails allowed.` });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Send token and user info
    res.json({
      token,
      user: {
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};