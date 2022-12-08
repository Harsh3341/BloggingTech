const sendToken = (token, statusCode, res, user) => {
  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000 // 30 days
    ),
    httpOnly: true,
  };

  // Send cookie
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
