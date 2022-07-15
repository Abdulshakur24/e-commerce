const express = require("express");
const apiRouter = express.Router();

const paymentRouter = require("./payments");
const userRouter = require("./users");
const historyRoute = require("./history");
const oauth = require("./oauth");

apiRouter.use("/payments", paymentRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/history", historyRoute);
apiRouter.use("/auth", oauth);

module.exports = apiRouter;
