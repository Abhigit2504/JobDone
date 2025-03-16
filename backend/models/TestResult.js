const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  jobId: { type: String, required: true },
  score: { type: Number, required: true },
  rating: { type: String, required: true },
});

module.exports = mongoose.model('TestResult', testResultSchema);