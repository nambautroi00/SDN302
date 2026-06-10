const express = require("express");
const mongoose = require("mongoose");
const passport = require("./config/jwtConfig");
const articleRouter = require("./routers/articleRouter");
const videoRouter = require("./routers/videoRouter");
const userRouter = require("./routers/userRouter");
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/ex23")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Initialize Passport (JWT - no sessions)
app.use(passport.initialize());

app.use(express.json());
app.use("/users", userRouter);
app.use("/articles", articleRouter);
app.use("/videos", videoRouter);

app.use("/", (req, res) => {
  res.send("WELLCOME");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    error: err.message || "An error occurred, please try again later.",
  });
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});