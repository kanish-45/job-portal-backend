const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

connection.connect((err) => {
  if (err) {
    console.error("Connection failed ❌", err);
    return;
  }

  console.log("Connected to RDS ✅");

  connection.query("CREATE DATABASE jobportal", (err, result) => {
    if (err) {
      console.error("Error creating DB ❌", err);
    } else {
      console.log("Database created successfully ✅");
    }
    connection.end();
  });
});