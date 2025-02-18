
const express = require('express');
const cors = require('cors');
const db = require('./db_connect'); // Import of Promise-wrapped pool
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create User Profile



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
const PORT = process.env.PORT || 5173; // Use environment variable for port or default to 5173
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});