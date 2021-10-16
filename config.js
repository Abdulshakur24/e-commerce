require("dotenv").config();

module.exports = {
  KEYS: {
    SECRET: process.env.SECRET_KEY,
    PUBLISHABLE: process.env.PUBLISHABLE_KEY,
  },
};
