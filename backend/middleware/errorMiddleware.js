const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  if (err.code === 11000) {
    res.status(400);
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    res.json({ message });
  } else {
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  }

  // mongoose duplicate key
};

module.exports = errorHandler;
