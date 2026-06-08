const express = require("express");
const articleRouter = require("./routers/articleRouter");
const app = express();
const port = 3000;

app.use(express.json());
app.use("/articles", articleRouter);

app.use("/", (req, res) => {
  res.send("WELLCOME");
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
