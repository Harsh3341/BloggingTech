const asyncHandler = require("express-async-handler");
const Blog = require("../models/userBlogs");
const User = require("../models/userModel");

// Get All Blogs

const getBlogs = asyncHandler(async (req, res) => {
  // get all blogs from database
  const blogs = await Blog.find();

  // get user name from user model
  const temp = blogs.map(async (blog) => {
    const user = await User.findById(blog.user);

    {
      if (user !== null) {
        try {
          return {
            ...blog._doc,
            name: user.name,
          };
        } catch (error) {
          console.log(error);
        }
      }

      return {
        ...blog._doc,
        name: "Unknown",
      };
    }
  });

  // wait for all promises to resolve
  const blogs2 = await Promise.all(temp);

  // send user data to frontend
  res.status(200).json({
    success: true,
    blogs: blogs2,
  });
});

// Get All Users

const getAllUsers = asyncHandler(async (req, res) => {
  // get all users from database
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Get Searched User

const getSearchedUser = asyncHandler(async (req, res) => {
  const id = req.params.id; // get username from url params (frontend)

  const user = await User.find({ username: id }).select("-_id"); // get user data from database and remove _id from response data (security)

  // send user data to frontend
  if (user) {
    res.status(200).json({
      success: true,
      users: user[0],
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Detailed Blog

const detailedBlog = asyncHandler(async (req, res) => {
  const id = req.params.id; // get blog id from url params (frontend)

  const blog = await Blog.findById(id); // get blog data from database

  // send blog data to frontend
  if (blog) {
    const user = await User.findById(blog.user);

    res.status(200).json({
      success: true,
      blog: {
        ...blog._doc,
        name: user.name,
      },
    });
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

module.exports = { getBlogs, getAllUsers, getSearchedUser, detailedBlog };
