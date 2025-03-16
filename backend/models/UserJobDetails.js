const mongoose = require('mongoose');

const userJobDetailsSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  role: { type: String, required: true },
  companyName: { type: String, required: true },
  previousSalary: { type: Number, required: true },
  expectedSalary: { type: Number, required: true },
  skills: { type: String, required: true },
  resume: { type: String, required: true }, // Store file path or URL
});

const UserJobDetails = mongoose.model('UserJobDetails', userJobDetailsSchema);

module.exports = UserJobDetails;