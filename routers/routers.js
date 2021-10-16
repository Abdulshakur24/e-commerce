const express = require("express");
const apiRouter = express.Router();

const paymentRouter = require("../routers/payments");
const userRouter = require("../routers/users");

apiRouter.use("/payments", paymentRouter);
apiRouter.use("/user", userRouter);

module.exports = apiRouter;
