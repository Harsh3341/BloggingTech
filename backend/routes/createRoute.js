const express = require("express");
const router = express.Router();
const createPost = require("../controllers/createPostController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createPost);

module.exports = router;
