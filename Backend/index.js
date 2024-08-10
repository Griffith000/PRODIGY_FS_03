// Initiate the server
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user-route");
const authRoutes = require("./routes/auth-route");
const customError = require("./utils/error");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
const directoryName = path.resolve();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use(cors());
app.use(express.static(path.join(directoryName, "client/dist")));
//production mode for later
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({
    success: false,
    message: message,
    status: status,
  });
});
