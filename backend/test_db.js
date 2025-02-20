const db = require('./db_connect.js');

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log("Database Connected! Test Query Result:", rows[0].result);
  } catch (err) {
    console.error("Database Connection Error:", err);
  }
}

testConnection();
