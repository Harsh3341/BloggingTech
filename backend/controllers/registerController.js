const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  res.send(username, email, password);
});

module.exports = registerUser;
