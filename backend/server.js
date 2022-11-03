require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorMiddleware");

// Connect to database
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/register", require("./routes/registerRoute"));
app.use("/api/v1/login", require("./routes/loginRoute"));
app.use("/api/v1/logout", require("./routes/logoutRoute"));
app.use("/api/v1/password", require("./routes/resetPasswordRoute"));
app.use("/api/v1/info", require("./routes/userDataRoute"));
app.use("/api/v1/blog", require("./routes/createRoute"));
app.use("/api/v1", require("./routes/homeRoute"));

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`.green.underline.bold)
);
