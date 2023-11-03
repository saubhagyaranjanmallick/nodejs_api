const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "saubhagya_dev",
});

pool.getConnection((err) => {
  if (err) console.log("MySQL Error: " + JSON.stringify(err));
});

const connection = pool.promise();

if (connection) console.log("MySQL Connected");

module.exports = connection;
