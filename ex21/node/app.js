const express = require("express");
const articleRouter = require("./routers/articleRouter");
const videoRouter = require("./routers/videoRouter");
const userRouter = require("./routers/userRouter");
const auth = require("./authentication/auth");
const sessionConfig = require("./config/sessionConfig");
const app = express();
const port = 3000;

// Session configuration (must be before routes)
sessionConfig(app);

app.use(express.json());
app.use("/users", userRouter);
app.use("/articles", articleRouter);
app.use("/videos", videoRouter);

app.use("/", auth.isAuthenticated, (req, res) => {
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