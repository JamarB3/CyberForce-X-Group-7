require('dotenv').config({ path: './.env' }); // Explicitly load .env from backend
const mysql = require('mysql2');

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test',
});

// Test the database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error connecting to the database:', err.stack);
  } else {
    console.log('✅ Connected to the database.');
    connection.release();
  }
});

module.exports = db.promise(); // Enable async/await
