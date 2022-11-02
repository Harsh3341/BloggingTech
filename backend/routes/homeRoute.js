const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getBlogs } = require("../controllers/homeController");

router.get("/", getBlogs);

module.exports = router;
