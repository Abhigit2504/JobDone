const express = require('express');
const Job = require('../models/Job');
const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Get a single job by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job details' });
  }
});

// Add a new job
router.post('/add', async (req, res) => {
  try {
    const { role, companyName, description, location, experienceRequired, salary } = req.body;

    // Validate required fields
    if (!role || !companyName || !description || !location || !experienceRequired || !salary) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newJob = new Job({
      role,
      companyName,
      description,
      location,
      experienceRequired,
      salary,
    });

    await newJob.save(); // Save the new job to the database
    res.status(201).json(newJob); // Return the created job
  } catch (error) {
    console.error('Error adding job:', error);
    res.status(500).json({ error: 'Failed to add job' });
  }
});

// Delete a job by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

module.exports = router;