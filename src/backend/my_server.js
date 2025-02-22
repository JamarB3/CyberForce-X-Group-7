const express = require('express');

//SQL & Backend
const mysql = require('mysql2');

//Cookie work
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
require('dotenv').config();


// Create a connection using environment variables
// const connection = mysql.createConnection({
//     host: process.env.MYSQL_HOST,       
//     user: process.env.MYSQL_USER,       
//     password: process.env.MYSQL_PASSWORD,  
//     database: process.env.MYSQL_DATABASE  
//   });
  
//   // Connect to the database
//   connection.connect((err) => {
//     if (err) {
//       console.error('Error connecting to MySQL:', err);
//       return;
//     }
//     console.log('Connected to MySQL database!');
//   });
const db = require('./mydb_connect');

  
// Define a GET route that runs a MySQL command
app.get('/api/users', (req, res) => {
// Example query: select all records from the 'users' table
const query = 'SELECT * FROM users';

connection.query(query, (err, results) => {
    if (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Database query error');
    return;
    }
    res.json(results);
    });
});





// Define a GET route at the root URL that returns "Hello World"
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server on port 3001 (or any other port you prefer)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
