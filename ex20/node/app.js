const express = require("express");
const cookieParser = require("cookie-parser");
const articleRouter = require("./routers/articleRouter");
const videoRouter = require("./routers/videoRouter");
const userRouter = require("./routers/userRouter");
const auth = require("./authentication/auth");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
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
