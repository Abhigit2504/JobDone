const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  skills: { type: String, required: true },
});

module.exports = mongoose.model('Users', userSchema);