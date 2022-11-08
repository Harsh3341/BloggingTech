const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;

  if (!username || !email || !password || !confirmpassword) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  if (password !== confirmpassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await User.create({
    username,
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  if (user) {
    user.password = undefined;
    sendToken(generateToken(user._id), 200, res, user);
  } else {
    res.status(400);
    throw new Error("User not created");
  }
});

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = registerUser;
