const Pool = require("pg").Pool;

//local postgres
const pool = new Pool({
  user: "postgres",
  password: "123456",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

module.exports = pool;
