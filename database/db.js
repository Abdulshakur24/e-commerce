const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = new Pool({
  user: "postgres",
  password: "postgres",
  port: 5432,
  host: "localhost",
  database: "audiophile",
});

const productionConfig = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const pool =
  process.env.NODE_ENV === "production" ? productionConfig : devConfig;

module.exports = pool;
