const stripe = require("stripe")(require("../config").KEYS.SECRET);
const pool = require("../database/db");
const express = require("express");
const paymentRouter = express.Router();

paymentRouter.get("/:id", async (req, res, next) => {
  try {
    await pool.query("SELECT * FROM users;").then((response) => {
      res.send(response.rows);
    });
  } catch (error) {
    res.send(error);
  }
});

paymentRouter.post("/:total", async (req, res) => {
  try {
    const { name, email, phone, address, zipCode, city, country } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.params.total * 100,
      currency: "usd",
    });
    const { id, client_secret, amount, created } = paymentIntent;
    res.send({ id, client_secret, amount, created });
  } catch (error) {
    res.send(error);
  }
});

module.exports = paymentRouter;
