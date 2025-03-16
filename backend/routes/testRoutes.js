const express = require('express');
const TestQuestion = require('../models/TestQuestion');
const router = express.Router();

// Add a test question
router.post('/add-question', async (req, res) => {
  const { jobId, question, options, correctAnswer } = req.body;
  try {
    const newQuestion = new TestQuestion({ jobId, question, options, correctAnswer });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add question' });
  }
});

// Get questions for a specific job
router.get('/questions/:jobId', async (req, res) => {
  const { jobId } = req.params;
  try {
    const questions = await TestQuestion.find({ jobId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

module.exports = router;