const mysql = require("mysql2/promise");

//pool is a collection and connection to the database
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "lilylin",
  password: "1qaz@WSX",
  database: "assignment",
});

module.exports = pool;
