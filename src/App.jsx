import React, { useState } from "react";
import { dummyReviews } from "./data/dummyReviews";
import ReviewPopup from "./components/ReviewPopup";
import "./App.css";
import placeholderImage from "./assets/placeholder-image.jpg";

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [reviews, setReviews] = useState(dummyReviews);
  const [expandedImage, setExpandedImage] = useState(null); // State for expanded image

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleReviewSubmit = (newReview) => {
    const formattedReview = {
      id: reviews.length + 1,
      user: "Anonymous User",
      rating: newReview.rating,
      review: newReview.reviewText,
      date: new Date().toLocaleDateString(),
      photo: newReview.uploadedFiles,
    };

    setReviews([formattedReview, ...reviews]);
  };

  const handleImageClick = (imageSrc) => {
    setExpandedImage(imageSrc);
  };

  const handleCloseExpandedImage = () => {
    setExpandedImage(null);
  };

  return (
    <div>
      <h1>Our App! It works!</h1>
      <h2>User Reviews</h2>

      <button className="test-button" onClick={() => setShowPopup(true)}>
        Add a Review
      </button>

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
            alignItems: "flex-start", // Align items to the top
            gap: "10px",
          }}
        >
          <img
            src={placeholderImage}
            alt="User Avatar"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div>
            <h3>{review.user}</h3>
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
                      cursor: "pointer", // Indicate it's clickable
                    }}
                    onClick={() => handleImageClick(URL.createObjectURL(file))} // Expand on click
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Expanded Image Overlay */}
      {expandedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent background
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000, // Ensure it's on top
          }}
          onClick={handleCloseExpandedImage} // Close on background click
        >
          <img
            src={expandedImage}
            alt="Expanded Review Attachment"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "5px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default App;
