const express = require("express");
const apiRouter = express.Router();

const paymentRouter = require("../routers/payments");
const userRouter = require("../routers/users");
const tokenRoute = require("./token");

apiRouter.use("/payments", paymentRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/token", tokenRoute);

module.exports = apiRouter;
