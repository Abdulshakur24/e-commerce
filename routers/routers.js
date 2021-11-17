const express = require("express");
const apiRouter = express.Router();

const paymentRouter = require("./payments");
const userRouter = require("./users");
const tokenRoute = require("./token");
const historyRoute = require("./history");

apiRouter.use("/payments", paymentRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/token", tokenRoute);
apiRouter.use("/history", historyRoute);

module.exports = apiRouter;
