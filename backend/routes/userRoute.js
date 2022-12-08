const express = require("express"); // import express
const router = express.Router(); // create router

// import controllers
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

// import middleware
const { protect } = require("../middleware/authMiddleware");

// register a new user
router.post("/register", registerUser);

// login user
router.post("/login", loginUser);

// logout user
router.get("/logout", logoutUser);

// forgot password
router.post("/password/forgot", forgotPassword);

// reset password
router.put("/password/reset/:token", resetPassword);

module.exports = router;
