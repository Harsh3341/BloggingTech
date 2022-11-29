const express = require("express");
const router = express.Router();
const {
  createPost,
  deletePost,
} = require("../controllers/createPostController");
const { getUserBlog } = require("../controllers/userDataController");
const { detailedBlog } = require("../controllers/homeController");
const protect = require("../middleware/authMiddleware");

router.post("/create", protect, createPost);
router.delete("/delete/:id", protect, deletePost);
router.get("/", protect, getUserBlog);
router.put("/:id", protect, detailedBlog);

module.exports = router;
