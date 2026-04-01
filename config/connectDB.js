const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "93.127.185.24",
  user: "sswin90",
  password: "Suraj@9012",
  database: "sswin90",
  dateStrings: true
});

export default connection;
