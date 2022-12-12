const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500; // if statusCode is not set, set it to 500

  // mongoose bad ObjectId
  if (err.code === 11000) {
    res.status(400);
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`; // get duplicate field name
    res.json({ message });
  } else {
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack, // if in production, don't send stack trace
    });
  }
};

module.exports = errorHandler;
