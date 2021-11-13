const pool = require("../database/db");
const express = require("express");
const { paymentCharge } = require("../controllers/controllers");
const auth = require("../authentication/auth");
const paymentRouter = express.Router();

paymentRouter.post("/", auth, paymentCharge);

module.exports = paymentRouter;
