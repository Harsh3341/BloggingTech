const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Blogs = require("../models/userBlogs");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary");

// Get User Data

const getUser = asyncHandler(async (req, res) => {
  // get user data from database
  const user = await User.findById(req.user.id);

  // send user data to frontend
  if (user) {
    res.status(200).json({
      success: true,
      user,
    });
  }
});

// Update Password

const changePassword = asyncHandler(async (req, res) => {
  // get old password, new password and confirm password from frontend
  const { oldPassword, newPassword, confirmPassword } = req.body;

  // check if all fields are provided
  if (!oldPassword || !newPassword || !confirmPassword) {
    res.status(400);
    throw new Error("Please provide all fields");
  }

  // check if old password is correct
  const user = await User.findById(req.user.id).select("+password"); // select password field

  // check if new password and confirm password match
  if (user && (await bcrypt.compare(oldPassword, user.password))) {
    if (newPassword != confirmPassword) {
      res.status(400);
      throw new Error("Passwords do not match");
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10); // generate salt
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // save new password
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
  // get user data from frontend
  const { name, email, username } = req.body;

  // check if all fields are provided
  if (!name || !email || !username) {
    res.status(400);
    throw new Error("Please provide all fields");
  }

  // create new user data
  const newUserData = {
    name,
    email,
    username,
  };

  // update user data
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });

  // send updated user data to frontend
  res.status(200).json({
    success: true,
    user,
  });
});

// Get Users Blog

const getUserBlog = asyncHandler(async (req, res) => {
  // get user data from database
  const user = await Blogs.find({ user: req.user.id });

  // get user name from user model
  const temp = user.map(async (blog) => {
    const user = await User.findById(blog.user);
    {
      if (user !== null) {
        try {
          return {
            ...blog._doc,
            name: user.name, // get name from user model
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
  const blogs = await Promise.all(temp);

  // send user data to frontend
  if (user) {
    res.status(200).json({
      success: true,
      blogs,
    });
  }
});

// upload image to cloudinary
const uploadImage = asyncHandler(async (req, res) => {
  const { image } = req.body;

  // check if image is provided
  if (!image) {
    res.status(400);
    throw new Error("Please provide an image");
  }

  const myCloud = await cloudinary.v2.uploader.upload(image, {
    folder: "blog",
    width: 150,
    crop: "scale",
  });

  // delete old image from cloudinary
  if (req.user.avatar.public_id !== "blog/default") {
    await cloudinary.v2.uploader.destroy(req.user.avatar.public_id);
  }

  // upload image url to database
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    },
    {
      new: true,
      runValidators: true,
      userFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    user,
  });
});

module.exports = {
  getUser,
  changePassword,
  updateProfile,
  getUserBlog,
  uploadImage,
};
