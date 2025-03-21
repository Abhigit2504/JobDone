const express = require('express');
const router = express.Router();
const User = require('../models/userapp'); // Ensure this model exists

// GET all users
router.get('/', async (req, res) => { // Use '/' here
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;