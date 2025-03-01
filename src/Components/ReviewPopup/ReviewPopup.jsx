import React, { useState, useEffect } from "react";
import "./ReviewPopup.css";

const ReviewPopup = ({ onClose, onSubmit, review, isEditing }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [newlyUploadedFiles, setNewlyUploadedFiles] = useState([]);

  useEffect(() => {
    if (isEditing && review) {
      setReviewText(review.review);
      setRating(review.rating);
      setUploadedFiles(review.photo || []);
      setNewlyUploadedFiles([]);
    } else {
      setReviewText("");
      setRating(0);
      setUploadedFiles([]);
      setNewlyUploadedFiles([]);
    }
  }, [isEditing, review]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + uploadedFiles.length + newlyUploadedFiles.length > 3) {
      alert("You can only upload up to 3 photos.");
      return;
    }
    setNewlyUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleSubmit = () => {
    if (reviewText && rating > 0) {
      const allFiles = [...uploadedFiles, ...newlyUploadedFiles];
      onSubmit({ reviewText, rating, uploadedFiles: allFiles });
      onClose();
    } else {
      alert("Please provide a rating and review text before submitting.");
    }
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % (uploadedFiles.length + newlyUploadedFiles.length));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + uploadedFiles.length + newlyUploadedFiles.length) % (uploadedFiles.length + newlyUploadedFiles.length));
  };


  const handleRemoveFile = (indexToRemove, isNewlyUploaded) => {
    if (isNewlyUploaded) {
      setNewlyUploadedFiles(newlyUploadedFiles.filter((_, index) => index !== indexToRemove));
    } else {
      setUploadedFiles(uploadedFiles.filter((_, index) => index !== indexToRemove));
    }
  };

  const allFiles = [...uploadedFiles, ...newlyUploadedFiles];

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{isEditing ? "Edit Review" : "Reviewee (Business)"}</h2>

        <div className="stars-container">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? "selected" : ""}`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          className="review-input"
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>

        <div className="upload-container">
          <label htmlFor="file-upload" className="upload-icon">
            📎
            <span className="tooltip">Upload Photos</span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />

          {allFiles.length > 0 && (
            <div className="file-feedback">
              <small>{allFiles.length} file(s) uploaded successfully!</small>
              <div className="thumbnail-container">
                {allFiles.map((file, index) => {
                  const isNewlyUploaded = index >= uploadedFiles.length;
                  return (
                    <div key={index} className="thumbnail-wrapper">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Uploaded ${index + 1}`}
                        className="thumbnail"
                      />
                      <span className="remove-file" onClick={() => handleRemoveFile(index, isNewlyUploaded)}>
                        &times;
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="popup-buttons">
          <button onClick={handleSubmit} className="submit-button">
            {isEditing ? "Save Changes" : "Submit"}
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;