const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.status(200).json({
      success: true,
      user,
    });
  }
});

// Update Password
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    res.status(400);
    throw new Error("Please provide all fields");
  }
  const user = await User.findById(req.user.id).select("+password");

  if (user && (await bcrypt.compare(oldPassword, user.password))) {
    if (newPassword != confirmPassword) {
      res.status(400);
      throw new Error("Passwords do not match");
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword;
      await user.save();
      res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    }
  } else {
    res.status(400);
    throw new Error("Incorrect password");
  }
});

// update user profile
const updateProfile = asyncHandler(async (req, res) => {
  const newUserData = {
    username: req.body.username,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

module.exports = { getUser, changePassword, updateProfile };
