const Jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  // get token from cookies
  const { token } = req.cookies;
  {
    try {
      const decoded = Jwt.verify(token, process.env.JWT_SECRET); // verify token using secret key from .env file (backend) and get user id from token payload (frontend)
      req.user = await User.findById(decoded.id).select("-password"); // get user data from database and send to frontend
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  // check if token exists
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = protect;
