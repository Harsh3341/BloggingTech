const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

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
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } else {
    res.status(400);
    throw new Error("User not created");
  }
});

module.exports = registerUser;
