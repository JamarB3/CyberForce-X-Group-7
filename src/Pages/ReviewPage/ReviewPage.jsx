import React, { useState } from "react";
import { dummyReviews } from "../../data/dummyReviews/dummyReviews";
import ReviewPopup from "../../components/ReviewPopup/ReviewPopup";
import "./ReviewPage.css";
import placeholderImage from "../../assets/placeholder-image.jpg";
import Helpful from "../../components/Helpful/Helpful";
import EditDelete from "../../components/EditDelete/EditDelete";

const ReviewPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [reviews, setReviews] = useState(dummyReviews);
  const [expandedImage, setExpandedImage] = useState(null);
  const currentUser = "Anonymous User"; // Replace with actual user logic

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleReviewSubmit = (newReview) => {
    const formattedReview = {
      id: reviews.length + 1,
      user: currentUser, // Set the user to the current user
      rating: newReview.rating,
      review: newReview.reviewText,
      date: new Date().toLocaleDateString(),
      photo: newReview.uploadedFiles,
      helpfulCount: 0,
    };
    setReviews([formattedReview, ...reviews]);
    setShowPopup(false);
  };

  const handleImageClick = (imageSrc) => {
    setExpandedImage(imageSrc);
  };

  const handleCloseExpandedImage = () => {
    setExpandedImage(null);
  };

  const handleDeleteReview = (reviewId) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
  };

  const handleEditReview = (reviewId, editedReview) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId ? { ...review, ...editedReview } : review
      )
    );
  };

  return (
    <div className="review-page-container">
      <h1>User Reviews</h1>
      <button className="test-button" onClick={() => setShowPopup(true)}>
        Add a Review
      </button>

      {showPopup && <ReviewPopup onClose={handlePopupClose} onSubmit={handleReviewSubmit} />}

      <div className="reviews-container">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <img src={placeholderImage} alt="User Avatar" className="user-avatar" />
            <div className="review-content">
              <h3>{review.user}</h3>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`star ${star <= review.rating ? "selected" : ""}`}>
                    ★
                  </span>
                ))}
              </div>
              <p>{review.review}</p>
              <small>Date: {review.date}</small>
              {review.photo && (
                <div className="uploaded-photos">
                  {review.photo.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt="Review Attachment"
                      className="review-image"
                      onClick={() => handleImageClick(URL.createObjectURL(file))}
                    />
                  ))}
                </div>
              )}
              <Helpful initialHelpfulCount={review.helpfulCount} />
              {review.user === currentUser && ( // Conditionally render EditDelete
                <EditDelete
                  review={review}
                  onDelete={handleDeleteReview}
                  onEdit={handleEditReview}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {expandedImage && (
        <div className="expanded-image-overlay" onClick={handleCloseExpandedImage}>
          <img src={expandedImage} alt="Expanded Review Attachment" className="expanded-image" />
        </div>
      )}
    </div>
  );
};

export default ReviewPage;