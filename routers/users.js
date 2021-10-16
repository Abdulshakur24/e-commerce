const express = require("express");
const userRouter = express.Router();
const pool = require("../database/db");
const bcrypt = require("bcrypt");

const saltRounds = 5;

//http://localhost:5010/user/id/
userRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool
      .query("SELECT id, name, email FROM users WHERE id = $1", [id])
      .then((response) => {
        res.send(response.rows[0]);
      });
  } catch (error) {
    res.send(error);
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const name = req.body.rg_name,
      email = req.body.rg_email,
      password = req.body.rg_password;

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hashedPassword) {
        await pool
          .query("SELECT email FROM users WHERE email = $1;", [email])
          .then(async (responseS) => {
            if (!responseS.rowCount) {
              await pool
                .query(
                  "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id, name, email;",
                  [name, email, hashedPassword]
                )
                .then((responseI) => {
                  res.send(responseI.rows[0]);
                });
            } else res.send("Email already exist!");
          });
      });
    });
  } catch (error) {
    res.send(error);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const email = req.body.lg_email,
      password = req.body.lg_password;

    await pool
      .query("SELECT id, name, email, password  FROM users WHERE email = $1;", [
        email,
      ])
      .then(async (response) => {
        if (response.rowCount) {
          bcrypt
            .compare(password, response.rows[0].password)
            .then(function (result) {
              if (result) {
                delete response.rows[0]?.password;
                res.send(response.rows);
                return;
              }
              res.send("Incorrect Password!");
            });
        } else res.send("Account not Found.");
      });
  } catch (error) {
    res.send(error);
  }
});

module.exports = userRouter;
