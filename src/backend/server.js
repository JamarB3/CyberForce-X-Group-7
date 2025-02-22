
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');  // <--- Import
const db = require('./db_connect'); // Import of Promise-wrapped pool
const jwt = require('jsonwebtoken')

// ...

const app = express();

app.use(cookieParser()); // <--- Add this line

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',  // <--- IMPORTANT: specific origin
  credentials: true                 // <--- to allow cookies to be sent
}));

//Expects json object
const setHttpOnlyToken = (res, user) => {
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true, // Prevents JavaScript access (protects against XSS)
    secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
    sameSite: "Strict", // Helps prevent CSRF attacks
    maxAge: 24 * 60 * 60 * 1000, // 1-day expiration
  });

  return token; // Optional: Return the token if needed for debugging
};


// Create User Profile
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    // Checking if email already exists
    const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Insert new user
    const [result] = await db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);

    const newUser = { id: result.insertId, email };  // Store user details
    setHttpOnlyToken(res, newUser);  // Set JWT token in HTTP-only cookie

    res.status(201).json({ message: "User profile creation is successful!" });  // Remove undefined `token`
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// 🔹 Verify Token & Get User Info (Session Check)
app.get("/api/users/me", (req, res) => {
  const token = req.cookies.token; // Get JWT from cookie

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json(decoded); // Return user data
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
});



//Get all users from DB
app.get('/api/users', async (req, res) => {
  try {
    // Select all records from the 'users' table
    const [users] = await db.query('SELECT * FROM users');
    
    // Send the retrieved users as JSON response
    res.json(users);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Database query error' });
  }
});


  

// Route for getting all review data from the database 
app.get('/api/reviews', async (req, res) => { //Route for GET request, async = asynchronous operation 
  try {
    const {business_id, user_id, page = 1, limit = 10} = req.query;
    let query = 'SELECT Review_ID, Business_ID, User_ID, Rating, Review_text, Created_At FROM Reviews WHERE 1=1';
    const params = [];

    if (business_id) {
      query += ' AND Business_ID = ?';
      params.push(business_id);
    }

    if (user_id) {
      query += ' AND User_ID = ?';
      params.push(user_id);
    }

    query += ' ORDER BY Created_At DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), (Number(page) - 1) * Number(limit));

    const [results] = await db.promise().query(query, params);
    res.json(results);
  }
  catch (err){
    console.error("Error fetching reviews:", err);
    res.status(500).json({ err: "Internal server error"});
  }
});

// Retrieve a single Review By ID route
app.get('/api/reviews/:id', async (req,res) => {
  const reviewID = Number(req.params.id);
  if (isNaN(reviewID))
    return res.status(400).json({ error: "Invalid review ID" });

  try {
    const [review] = await db.promise().query(
      'SELECT Review-ID, Business_ID, User_ID, Rating, Review_text, Created_At FROM Reviews WHERE Review_ID=?',[reviewID]
    );
    if (review.length === 0) {
      return res.status(404).json({error: "Review not found"});
    }
    res.json(review[0]);
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Adding a Review
app.post('/api/reviews', async (req, res) => {
  const { business_id, user_id, rating, review_text } = req.body; // Assuming you're getting these from the request body

  if (!business_id || !user_id || !rating || !review_text) {
    return res.status(400).json({error: "All fields are required" });
  }

  if (typeof rating !== "number" || rating < 0.5 || rating > 5){
    return res.status(400).json({ error: "Rating must be a number between 1 and 5"});
  }
  try {
    const [result] = await db.promise().query('INSERT INTO Reviews (Business_ID, User_ID, Rating, Review_text, Created_At) VALUES (?, ?, ?, ?, NOW(), NOW())',[business_id, user_id, rating, review_text]);
    res.status(201).json({ message: 'Review added successfully', insertId: result.insertId }); // 201 Created status code
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ error: err.message });
  }
});

// Updating a Review
app.put('/api/reviews/:id', async (req, res) => {
  const reviewID = Number(req.params.id);
  const {rating, review, review_text} = req.body;

  if (isNaN(reviewID))
    return res.status(400).json({error: "Invalid review ID"});
  if (!rating || !review_text)
    return res.status(400).json({error: "All fields are required" });

  try {
    const [result] = await db.promise().query(
      'UPDATE Reviews SET Rating = ?, Review_text = ?, Updated_At = NOW() WHERE Review_ID = ?',
      [rating, review_text, reviewId]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({error: "Review not found"});
    res.json({ message: "Review updated succsefully" });
  } catch (err) {
    console.error("Error updating review:", err);
    res.status(500).json({ error: "Internal server error" });
  }
})

// Getting Business Details
app.get('/api/Businesses/:Business_ID', async(req, res) => {
 
  try {
    const [business] = await db.promise().query('SELECT * FROM Businesses WHERE Business_ID = ?', [req.params.id])
    if (!business || business.length == 0) {
      return res.status(404).json({ error: 'Business not found' });
    }
    res.json(business[0]); 
  } catch (error) {
    console.error("Error fetching business details:", error);
    res.status(500).json({ error: 'Internal server error'});
  }
  }
)

// Get Like/Dislike Count for a Business
app.get('/api/businesses/:id/likes', async(req, res) => {
  try {
    const { id } = req.params;
    const [likes] = await db.promise().query(
      "SELECT COUNT(*) AS like_count FROM business_likes WHERE business_id = ? AND like_status = 'like'", 
      [id]
    );
    const [dislikes] = await db.promise().query(
      "SELECT COUNT(*) AS dislike_count FROM business_likes WHERE business_id = ? AND like_status = 'dislike'", 
      [id]
    );

    res.json({ likes: likes[0].like_count, dislikes: dislikes[0].dislike_count });
  } catch (err) {
    console.error("Error fetching like status counts:", err);
    res.status(500).json({ error: "Internal server error "});
  }
});

// Add or Update a Like/Dislike
app.post('/api/businesses/:id/like', async (req,res) => {
  const { id } = req.params;
  const { user_id, like_status } = req.body; // like_status = 'like' or 'dislike'
})

// Start the server
const PORT = 3001; // Use environment variable for port or default to 5173
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});