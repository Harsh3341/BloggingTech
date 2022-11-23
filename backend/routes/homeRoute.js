const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getBlogs,
  getAllUsers,
  getSearchedUser,
} = require("../controllers/homeController");

router.get("/", protect, getBlogs);
router.put("/:id", protect, getSearchedUser);
router.get("/users", protect, getAllUsers);

module.exports = router;
