const Pool = require("pg").Pool;

module.exports = new Pool({
  user: "postgres",
  password: "postgres",
  port: "5432",
  host: "localhost",
  database: "audiophile",
});
