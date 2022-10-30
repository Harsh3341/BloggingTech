const User2 = require("../models/userBlogs");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const Jwt = require("jsonwebtoken");

const createPost = asyncHandler(async (req, res) => {
  const { user, title, blog } = req.body;
  const { token } = req.cookies;
  const decoded = Jwt.verify(token, process.env.JWT_SECRET);

  if (!title || !blog) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create new post
  const data = await User2.create({
    user: decoded.id,
    title,
    blog,
  });

  if (data) {
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: {
        _id: data._id,
        user: data.user,
        title: data.title,
        blog: data.blog,
      },
    });
  } else {
    res.status(400);
    throw new Error("Post not created");
  }
});

module.exports = createPost;
