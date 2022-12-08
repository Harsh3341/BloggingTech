const mongoose = require("mongoose");

// connect to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); // connect to database

    console.log(`MongoDB Connected`.cyan.underline.bold);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
