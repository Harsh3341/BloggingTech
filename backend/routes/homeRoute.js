const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getBlogs, getAllUsers } = require("../controllers/homeController");

router.get("/", protect, getBlogs);
router.get("/users", protect, getAllUsers);

module.exports = router;
