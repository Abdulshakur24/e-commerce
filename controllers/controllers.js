require("dotenv").config();
const pool = require("../database/db");
const bcrypt = require("bcrypt");
const saltRounds = 7;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(require("../config").KEYS.SECRET);

const login = async (req, res) => {
  try {
    const email = req.body.lg_email,
      password = req.body.lg_password;

    if (!(email && password))
      return res.status(400).send("Please fill out the fields.");

    await pool
      .query("SELECT * FROM users WHERE email = $1;", [email])
      .then(async (response) => {
        const user = response.rows[0];

        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { id: user.id, email },
            process.env.SECRET_TOKEN_KEY,
            { expiresIn: "12h" }
          );
          user.token = token;
          delete user.password;

          return res.status(200).json(user);
        }
        return res.status(403).send("Incorrect Email/Password.");
      })
      .catch((error) => {
        console.log(error);
        res.status(403).send("Account not found.");
      });
  } catch (error) {
    res.sendStatus(500);
  }
};

const register = async (req, res) => {
  try {
    const name = req.body.rg_name,
      email = req.body.rg_email.toLowerCase(),
      password = req.body.rg_password;

    if (!(name && email && password))
      return res.status(400).send("Please fill out the fields.");

    if (!(name.length >= 5))
      return res.status(403).send("Name must be greater than 4");

    if (!validator.isEmail(email))
      return res.status(403).send("Please Enter Your Email Address.");

    if (!(password.length >= 8))
      return res
        .status(403)
        .send("Password must contain a minimum of 8 characters in length.");

    bcrypt.genSalt(saltRounds, function (err, salt) {
      console.log(err);
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
                    { id: user.id, email },
                    process.env.SECRET_TOKEN_KEY,
                    { expiresIn: "12h" }
                  );
                  user.token = token;
                  delete user.password;

                  res.status(201).json(user);
                });
              return;
            }
            res.status(409).send("Email Already Taken.");
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
    console.log(userId);

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
    const { token } = req?.body;

    const id = jwt.verify(token, process.env.SECRET_TOKEN_KEY).id;

    if (id) {
      await pool
        .query("SELECT * FROM users WHERE id = $1;", [id])
        .then(async (response) => {
          if (!response.rows.length) return res.status(401).send("Invalid Id");
          const user = response.rows[0];
          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRET_TOKEN_KEY,
            { expiresIn: "12h" }
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
