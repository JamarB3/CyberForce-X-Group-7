// db_connect.js
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,       
  user: process.env.MYSQL_USER,       
  password: process.env.MYSQL_PASSWORD,  
  database: process.env.MYSQL_DATABASE  
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

module.exports = connection;
