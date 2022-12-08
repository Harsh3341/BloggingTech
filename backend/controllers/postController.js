const User2 = require("../models/userBlogs"); // access the User model
const asyncHandler = require("express-async-handler"); // handle async errors
const Jwt = require("jsonwebtoken"); // generate signed token

// create a new post

const createPost = asyncHandler(async (req, res) => {
  // get the data from the request body
  const { title, blog, imageUrl } = req.body;

  // check if all fields are filled
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

  // if post is created, send the token to the client
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
  const { id } = req.params; // get the id from the request params
  const { token } = req.cookies; // get the token from the cookies
  const decoded = Jwt.verify(token, process.env.JWT_SECRET); // verify the token

  // find the post with the id and the user id
  const post = await User2.find({ _id: id, user: decoded.id });

  // if post is found, delete it
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

// export
module.exports = { createPost, deletePost };
