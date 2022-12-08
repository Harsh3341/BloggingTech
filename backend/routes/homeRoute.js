const express = require("express");
const router = express.Router();

// import controllers
const {
  getBlogs,
  getAllUsers,
  getSearchedUser,
} = require("../controllers/homeController");

// import middleware
const protect = require("../middleware/authMiddleware");

// get all blogs
router.get("/", protect, getBlogs);

// get searched user
router.put("/:id", protect, getSearchedUser);

// get all users
router.get("/users", protect, getAllUsers);

module.exports = router;
