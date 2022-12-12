const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"], // custom error message
    },
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: true, // unique username
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"], // custom error message for invalid email format using validator package from npm (https://www.npmjs.com/package/validator)
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      select: false, // don't show password when getting user data from database
    },
    resetPasswordToken: String, // reset password token
    resetPasswordExpire: Date, // reset password expire
  },
  { timestamps: true } // add createdAt and updatedAt fields
);

// Encrypt password using bcrypt

userSchema.methods.getresetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

module.exports = mongoose.model("userData", userSchema);
