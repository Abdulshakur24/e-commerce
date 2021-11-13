require("dotenv").config();
const pool = require("../database/db");
const bcrypt = require("bcrypt");
const saltRounds = 7;
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(require("../config").KEYS.SECRET);

const login = async (req, res) => {
  try {
    const email = req.body.lg_email,
      password = req.body.lg_password;

    if (!(email && password)) return res.status(400);
    await pool
      .query("SELECT * FROM users WHERE email = $1;", [email])
      .then(async (response) => {
        const user = response.rows[0];

        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { id: user.id, email },
            process.env.SECRET_TOKEN_KEY,
            { expiresIn: "1d" }
          );
          user.token = token;
          delete user.password;

          return res.status(200).json(user);
        }
        return res.status(403).send("Incorrect Email/Password.");
      })
      .catch(() => {
        res.status(403).send("Account not found.");
      });
  } catch (error) {
    res.sendStatus(500);
  }
};

const register = async (req, res) => {
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
                  const user = responseI.rows[0];

                  const token = jwt.sign(
                    { user_id: user.id, email },
                    process.env.SECRET_TOKEN_KEY,
                    { expiresIn: "1d" }
                  );
                  user.token = token;
                  delete user.password;

                  res.status(201).json(user);
                });
              return;
            }
            res.sendStatus(409);
          });
      });
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

const paymentCharge = async (req, res) => {
  try {
    const {
      userId,
      name,
      email,
      phone,
      address,
      zipCode,
      city,
      country,
      total,
    } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: "usd",
    });
    const { id, client_secret, amount, created } = paymentIntent;
    res.send({ id, client_secret, amount, created });
  } catch (error) {
    res.send(error);
  }
};

const token = async (req, res, next) => {
  try {
    const id = req?.body?.id;

    if (id) {
      await pool
        .query("SELECT * FROM users WHERE id = $1;", [id])
        .then(async (response) => {
          if (!response.rows.length) return res.status(401).send("Invalid Id");
          const user = response.rows[0];
          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRET_TOKEN_KEY,
            { expiresIn: "1d" }
          );
          user.token = token;
          delete user.password;

          return res.status(200).json(user);
        });
      return;
    }
    res.sendStatus(401);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  login,
  register,

  paymentCharge,
  token,
};
