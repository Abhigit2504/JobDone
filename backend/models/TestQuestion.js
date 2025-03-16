const mongoose = require('mongoose');

const testQuestionSchema = new mongoose.Schema({
  jobId: { type: String, required: true }, // Reference to the job
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
});

module.exports = mongoose.model('TestQuestion', testQuestionSchema);