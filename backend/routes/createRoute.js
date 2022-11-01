const express = require("express");
const router = express.Router();
const {
  createPost,
  deletePost,
} = require("../controllers/createPostController");
const protect = require("../middleware/authMiddleware");

router.post("/create", protect, createPost);
router.delete("/delete/:id", protect, deletePost);

module.exports = router;
