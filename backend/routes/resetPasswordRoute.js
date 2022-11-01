const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  forgotPassword,
  resetPassword,
} = require("../controllers/loginController");

router.post("/forgot", forgotPassword);
router.put("/reset/:token", resetPassword);

module.exports = router;
