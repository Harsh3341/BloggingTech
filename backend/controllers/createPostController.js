const User2 = require("../models/userBlogs");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const Jwt = require("jsonwebtoken");

const createPost = asyncHandler(async (req, res) => {
  const { title, blog, imageUrl } = req.body;

  if (!title || !blog) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create new post
  const data = await User2.create({
    user: req.user._id,
    title,
    blog,
    image: {
      public_id: "Random",
      url: imageUrl,
    },
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

// Delete Post
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  const decoded = Jwt.verify(token, process.env.JWT_SECRET);

  const post = await User2.find({ _id: id, user: decoded.id });
  if (post && post.length > 0) {
    await User2.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

module.exports = { createPost, deletePost };
