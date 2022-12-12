const express = require("express");
const router = express.Router();

// import controllers
const { createPost, deletePost } = require("../controllers/postController");
const { getUserBlog } = require("../controllers/userDataController");
const { detailedBlog } = require("../controllers/homeController");

// import middleware
const protect = require("../middleware/authMiddleware");

// create a new post
router.post("/blog/create", protect, createPost);

// delete a post
router.delete("/blog/delete/:id", protect, deletePost);

// get user blog
router.get("/blog", protect, getUserBlog);

// get detailed blog
router.get("/blog/:id", protect, detailedBlog);

module.exports = router;
