const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Blog = require("../models/userBlogs");
const User = require("../models/userModel");

const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();

  const temp = blogs.map(async (blog) => {
    const user = await User.findById(blog.user);
    {
      try {
        return {
          ...blog._doc,
          name: user.name,
        };
      } catch (error) {
        console.log(error);
      }
    }
  });

  const blogs2 = await Promise.all(temp);

  res.status(200).json({
    success: true,
    blogs: blogs2,
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
