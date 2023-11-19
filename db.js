const mysql = require("mysql2");
require("dotenv").config();
const secret = process.env.PASSWORD;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: secret,
  database: "hotel",
});

module.exports = db;
