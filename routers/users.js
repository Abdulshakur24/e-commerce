const express = require("express");
const auth = require("../authentication/auth");
const userRouter = express.Router();

const { register, login } = require("../controllers/controllers");

userRouter.post("/register", register);

userRouter.post("/login", login);

module.exports = userRouter;
