const express = require("express");
const router = express.Router();

// import controllers
const {
  getUser,
  changePassword,
  updateProfile,
} = require("../controllers/userDataController");

// import middleware
const protect = require("../middleware/authMiddleware");

// get user data
router.get("/user", protect, getUser);

// change password
router.put("/password/update", protect, changePassword);

// update profile
router.put("/profile/update", protect, updateProfile);

module.exports = router;
