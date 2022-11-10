const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Blog = require("../models/userBlogs");
const User = require("../models/userModel");

const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();

  res.status(200).json({
    success: true,
    blogs,
  });
});

// Get All Users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

module.exports = { getBlogs, getAllUsers };
