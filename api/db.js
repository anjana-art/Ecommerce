// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://bhattaanjana0:anjana123@anjana.zcmelmw.mongodb.net/myCollection?retryWrites=true&w=majority&appName=anjana',
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); // Exit if DB connection fails
  }
};

module.exports = connectDB;