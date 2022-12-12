const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db"); // import database connection
const cookieParser = require("cookie-parser"); // import cookie parser
const errorHandler = require("./middleware/errorMiddleware"); // import error handler
const path = require("path"); // import path module for serving static assets

// Connect to database
connectDB();

// allow cross-origin requests
app.use(cors());

// parse json data
app.use(express.json());

// parse urlencoded data
app.use(express.urlencoded({ extended: true }));

// parse cookie data
app.use(cookieParser());

// import routes
app.use("/api/v1", require("./routes/userRoute"));
app.use("/api/v1", require("./routes/userDataRoute"));
app.use("/api/v1", require("./routes/postRoute"));
app.use("/api/v1", require("./routes/homeRoute"));

// serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res
      .status(200)
      .sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
}

// error handler
app.use(errorHandler);

// start server
app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`.green.underline.bold)
);
