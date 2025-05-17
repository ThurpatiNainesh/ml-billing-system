const mongoose = require('mongoose');
require('dotenv').config();
async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('DB connection error:', err);
    process.exit(1);
  }
}
module.exports = connectDB;