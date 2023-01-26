const jwt = require("jsonwebtoken"); // generate signed token
const asyncHandler = require("express-async-handler"); // handle async errors
const bcrypt = require("bcryptjs"); // hash passwords
const User = require("../models/userModel"); // access the User model
const sendToken = require("../utils/jwtToken"); // send the token to the client
const sendEmail = require("../utils/sendEmail"); // send emails
const crypto = require("crypto"); // generate random tokens

// register a new user

const registerUser = asyncHandler(async (req, res) => {
  // get the data from the request body
  const { name, username, email, password, confirmpassword } = req.body;

  // check if all fields are filled
  if (!name || !username || !email || !password || !confirmpassword) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // check if passwords match
  if (password !== confirmpassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });

  // if user exists, throw an error
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await User.create({
    name,
    username,
    email: email.toLowerCase(),
    password: hashedPassword,
    avatar: {
      public_id: "avatar.png",
      url: "/img/avatar.png",
    },
  });

  // if user is created, send the token to the client
  if (user) {
    user.password = undefined;
    sendToken(generateToken(user._id), 200, res, user);
  } else {
    res.status(400);
    throw new Error("User not created");
  }
});

// Login user

const loginUser = asyncHandler(async (req, res) => {
  // get the data from the request body
  const { email, password } = req.body;

  // check if all fields are filled
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  // Find user by email
  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+password"
  );

  // if user exists, send the token to the client
  if (user && (await bcrypt.compare(password, user.password))) {
    user.password = undefined;
    sendToken(generateToken(user._id), 200, res, user);
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// Logout user

const logoutUser = asyncHandler(async (req, res) => {
  // clear the cookie
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  // send a success message
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

// Forgot password

const forgotPassword = asyncHandler(async (req, res) => {
  // Get user by email
  const user = await User.findOne({ email: req.body.email });

  // if user does not exist, throw an error
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Get Password Token
  const resetToken = user.getresetPasswordToken();

  // Save user to database
  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  // Create message
  const message = `Your password reset token is as follow: \n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

  // Send email
  try {
    await sendEmail({
      email: user.email,
      subject: "Blogger Password Recovery",
      message,
    });

    // Send success message
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    // if email could not be sent, reset the password token and password expire
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(500);
    throw new Error("Email could not be sent");
  }
});

// Reset password

const resetPassword = asyncHandler(async (req, res) => {
  // Hash token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // find user in db
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  // if user does not exist, throw an error
  if (!user) {
    res.status(400);
    throw new Error("Password reset token is invalid or has expired");
  }

  // check if passwords match
  if (req.body.password != req.body.confirmPassword) {
    res.status(400);
    throw new Error("Passowrd does not match");
  }

  // set new password
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(generateToken(user._id), 200, res, user);
});

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// exports
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
};
