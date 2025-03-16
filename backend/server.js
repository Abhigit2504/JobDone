const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));


// Import routes
const jobRoutes = require('./routes/jobRoutes');
const adminRoutes = require('./routes/userapplroute');
const userRoutes = require('./routes/userRoute'); // Corrected import
const userJobDetailsRoutes = require('./routes/userJobDetailsRoute');

// Mount routes
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin/users', adminRoutes);
app.use('/api/userjobdetails', userJobDetailsRoutes);
 
// API Endpoint to Save User Job Details

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});