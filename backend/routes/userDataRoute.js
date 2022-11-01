const express = require("express");
const router = express.Router();
const {
  getUser,
  changePassword,
  updateProfile,
} = require("../controllers/userDataController");
const protect = require("../middleware/authMiddleware");

router.get("/", protect, getUser);
router.put("/changePassword", protect, changePassword);
router.put("/updateProfile", protect, updateProfile);

module.exports = router;
