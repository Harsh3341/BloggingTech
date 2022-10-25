require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const colors = require("colors");
const errorHandler = require("./middleware/errorMiddleware");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/register", require("./routes/registerRoute"));
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`.green.underline.bold)
);
