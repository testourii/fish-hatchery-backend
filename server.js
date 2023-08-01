const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

//connect database
connectDB();
// Middleware
app.use(express.json({extended:false}));
// app.use(cors());


// API Routes
const authRoutes = require('./routes/authRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const roomRoutes = require('./routes/roomRoutes');
const tankRoutes = require('./routes/tankRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/tanks', tankRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
