const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  role: { type: String, required: true },
  companyName: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  experienceRequired: { type: String, required: true },
  salary: { type: Number, required: true },
});

module.exports = mongoose.model("jobs", jobSchema);
