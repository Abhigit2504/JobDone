const express = require('express');
const User = require('../models/User'); // Create a User model
const router = express.Router();

// Save user details
router.post('/', async (req, res) => {
  try {
    const { name, email, role, skills } = req.body;
    
    // Validate required fields
    if (!name || !email || !role || !skills) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newUser = new User({ name, email, role, skills });
    await newUser.save(); // Save the user to the database
    res.status(201).json(newUser); // Return the created user
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Failed to save user' });
  }
});

module.exports = router;