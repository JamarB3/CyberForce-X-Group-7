import React, { useState } from "react";
import { dummyReviews } from "./data/dummyReviews";
import ReviewPopup from "./components/ReviewPopup";
import "./App.css";
import placeholderImage from "./assets/placeholder-image.jpg"; // Ensure the image is in the correct directory

const App = () => {
  const [showPopup, setShowPopup] = useState(false); // State to toggle popup visibility
  const [reviews, setReviews] = useState(dummyReviews); // Combine dummyReviews with new ones

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleReviewSubmit = (newReview) => {

    
    const formattedReview = {
      
      id: reviews.length + 1, // Assign a unique ID
      user: "Anonymous User", // Placeholder for user (can be updated later)
      rating: newReview.rating,
      review: newReview.reviewText,
      date: new Date().toLocaleDateString(),
      photo: newReview.uploadedFiles, // Handle multiple uploaded files
    };

    setReviews([formattedReview, ...reviews]); // Add new review to the top
  };

  return (
    <div>
      <h1>Our App! It works!</h1>
      <h2>User Reviews</h2>

      {/* Button to open the review popup */}
      <button className="test-button" onClick={() => setShowPopup(true)}>
        Add a Review
      </button>

      {/* Display the popup if showPopup is true */}
      {showPopup && (
        <ReviewPopup onClose={handlePopupClose} onSubmit={handleReviewSubmit} />
      )}

      {/* Display reviews */}
      {reviews.map((review) => (
        <div
          key={review.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center", // Align items horizontally
            gap: "10px",
          }}
        >
          {/* User avatar using placeholder image */}
          <img
            src={placeholderImage}
            alt="User Avatar"
            style={{
              width: "40px", // Adjust size of the image
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div>
            <h3 style={{ display: "inline-block", marginLeft: "10px" }}>
              {review.user}
            </h3> {/* Align user name next to the avatar */}
            {/* Display the rating as stars */}
            <p>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= review.rating ? "selected" : ""}`}
                >
                  ★
                </span>
              ))}
            </p>
            <p>{review.review}</p>
            <small>Date: {review.date}</small>
            {/* Display uploaded photo if available */}
            {review.photo && (
              <div className="uploaded-photos">
                {review.photo.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt="Review Attachment"
                    style={{
                      marginTop: "10px",
                      maxWidth: "100px",
                      borderRadius: "5px",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
