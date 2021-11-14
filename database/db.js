const Pool = require("pg").Pool;
require("dotenv").config();

// const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_PORT}:${process.env.PG_HOST}/${process.env.PG_DATABASE}`;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// const pool = new Pool({
//   user: "postgres",
//   password: "postgres",
//   port: 5432,
//   host: "localhost",
//   database: "audiophile",
// });

module.exports = pool;
