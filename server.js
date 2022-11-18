require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./backend/config/db");
const cookieParser = require("cookie-parser");
const errorHandler = require("./backend/middleware/errorMiddleware");
const path = require("path");

// Connect to database
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/register", require("./backend/routes/registerRoute"));
app.use("/api/v1/login", require("./backend/routes/loginRoute"));
app.use("/api/v1/logout", require("./backend/routes/logoutRoute"));
app.use("/api/v1/password", require("./backend/routes/resetPasswordRoute"));
app.use("/api/v1/info", require("./backend/routes/userDataRoute"));
app.use("/api/v1/blog", require("./backend/routes/createRoute"));
app.use("/api/v1", require("./backend/routes/homeRoute"));

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`.green.underline.bold)
);
