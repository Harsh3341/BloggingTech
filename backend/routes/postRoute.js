const express = require("express");
const router = express.Router();

// import controllers
const { createPost, deletePost } = require("../controllers/postController");
const { getUserBlog } = require("../controllers/userDataController");
const { detailedBlog } = require("../controllers/homeController");

// import middleware
const protect = require("../middleware/authMiddleware");

// create a new post
router.post("/create", protect, createPost);

// delete a post
router.delete("/delete/:id", protect, deletePost);

// get user blog
router.get("/user", protect, getUserBlog);

// get detailed blog
router.get("/detailed/:id", protect, detailedBlog);

module.exports = router;
