const express = require('express');
const router = express.Router();
const multer = require('multer'); // For file uploads
const UserJobDetails = require('../models/userJobDetails');
const User = require('../models/User'); // Import User model for validation
const Job = require('../models/Job'); // Import Job model for validation


// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });



// GET all user job details
router.get('/', async (req, res) => {
  try {
    const userJobDetails = await UserJobDetails.find({});
    // console.log(userJobDetails)
    res.status(200).json(userJobDetails);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// POST new user job details
router.post('/', async (req, res) => {
  try {
    const { userId, jobId, status } = req.body;

    // Validate required fields
    if (!userId || !jobId || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if userId and jobId exist
    const userExists = await User.findById(userId);
    const jobExists = await Job.findById(jobId);

    if (!userExists || !jobExists) {
      return res.status(400).json({ message: 'Invalid userId or jobId' });
    }

    const newUserJobDetails = new UserJobDetails({ userId, jobId, status });
    await newUserJobDetails.save();
    res.status(201).json(newUserJobDetails);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

router.post('/:id', upload.single('resume'), async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      yearsOfExperience,
      role,
      companyName,
      previousSalary,
      expectedSalary,
      skills,
    } = req.body;

    // Get the uploaded file path
    const resumePath = req.file ? req.file.path : null;

    if (!resumePath) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    // Create a new UserJobDetails document
    const newUserJobDetails = new UserJobDetails({
      firstName,
      lastName,
      phone,
      yearsOfExperience,
      role,
      companyName,
      previousSalary,
      expectedSalary,
      skills,
      resume: resumePath,
    });

    // Save to MongoDB
    await newUserJobDetails.save();

    res.status(201).json({ message: 'User job details saved successfully', data: newUserJobDetails });
  } catch (error) {
    console.error('Error saving user job details:', error);
    res.status(500).json({ message: 'Failed to save user job details', error: error.message });
  }
});

module.exports = router;