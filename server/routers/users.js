const express = require("express");
const userRouter = express.Router();

const { register, login, token } = require("../controllers/controllers");

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.post("/token", token);

module.exports = userRouter;
