require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

// Connect to database
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/register", require("./routes/registerRoute"));
app.use("/login", require("./routes/loginRoute"));
app.use("/logout", require("./routes/logoutRoute"));
app.use("/create", require("./routes/createRoute"));
app.use("/", require("./routes/homeRoute"));

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`.green.underline.bold)
);
