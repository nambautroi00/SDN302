const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));

userRouter.post("/login", userController.login);
userRouter.post("/signup", userController.signup);
userRouter.post("/logout", userController.logout);

module.exports = userRouter;