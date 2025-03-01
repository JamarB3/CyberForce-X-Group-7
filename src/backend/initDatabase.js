const db = require('./mydb_connect');

const createReviewsTable = `
CREATE TABLE IF NOT EXISTS Reviews (
    Review_ID INT AUTO_INCREMENT PRIMARY KEY,
    Business_ID INT NOT NULL,
    User_ID INT NOT NULL,
    Rating DECIMAL(2,1) NOT NULL,
    Review_text TEXT,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    picture VARCHAR(100) NOT NULL,
    newUser BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

// Check and modify the users table if necessary
const checkUsersTable = `
SHOW COLUMNS FROM users;
`;

db.query(createReviewsTable, (err, results) => {
  if (err) {
    console.error("Error creating Reviews table:", err);
  } else {
    console.log("Reviews table created or already exists.");

    // Check the users table structure
    db.query(checkUsersTable, (err, columns) => {
      if (err) {
        console.error("Error checking users table:", err);
      } else {
        const columnNames = columns.map((col) => col.Field);

        // If 'password' column exists, remove it
        if (columnNames.includes("password")) {
          console.log("Removing 'password' column from users table...");
          db.query("ALTER TABLE users DROP COLUMN password", (err, result) => {
            if (err) {
              console.error("Error removing password column:", err);
            } else {
              console.log("'password' column removed successfully.");
            }
          });
        }
      }

      // Once users table is handled, ensure it exists
      db.query(createUsersTable, (err, results) => {
        if (err) {
          console.error("Error creating users table:", err);
        } else {
          console.log("Users table created or already exists.");
        }

        // Close the connection after both tables are processed
        db.end((err) => {
          if (err) console.error("Error closing the database connection:", err);
          else console.log("Database connection closed.");
        });
      });
    });
  }
});
