const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const authRoutes = require('../routes/auth.routes');
const feedbackRoutes = require('../routes/feedback.routes');
const userRoutes = require('../routes/user.routes');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/user', userRoutes);

// Connect to MongoDB (outside the handler to reuse connection across invocations)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Export the app as a serverless handler
module.exports = app;
module.exports.handler = serverless(app);
