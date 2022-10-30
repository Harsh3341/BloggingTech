const express = require("express");
const router = express.Router();
const { logoutUser } = require("../controllers/loginController");

router.get("/", logoutUser);

module.exports = router;
