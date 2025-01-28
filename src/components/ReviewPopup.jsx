import React, { useState } from "react";
import "./ReviewPopup.css";

const ReviewPopup = ({ onClose, onSubmit }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]); // Array to hold multiple files
  const [currentSlide, setCurrentSlide] = useState(0); // For slideshow navigation

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + uploadedFiles.length > 3) {
      alert("You can only upload up to 3 photos.");
      return;
    }
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleSubmit = () => {
    if (reviewText && rating > 0) {
      onSubmit({ reviewText, rating, uploadedFiles });
      onClose();
    } else {
      alert("Please provide a rating and review text before submitting.");
    }
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % uploadedFiles.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      (prevSlide - 1 + uploadedFiles.length) % uploadedFiles.length
    );
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Reviewee (Business)</h2>

        {/* Star rating */}
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

        {/* Text input for review */}
        <textarea
          className="review-input"
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>

        {/* Paperclip upload button */}
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
            style={{ display: "none" }} // Hides the default file input
          />

          {/* Uploaded files */}
          {uploadedFiles.length > 0 && (
            <div className="file-feedback">
              <small>
                {uploadedFiles.length} file(s) uploaded successfully!
              </small>
              {uploadedFiles.length > 3 ? (
                <div className="slideshow">
                  <button className="prev-button" onClick={handlePrevSlide}>
                    ◀
                  </button>
                  <img
                    src={URL.createObjectURL(uploadedFiles[currentSlide])}
                    alt={`Slide ${currentSlide + 1}`}
                    className="slideshow-image"
                  />
                  <button className="next-button" onClick={handleNextSlide}>
                    ▶
                  </button>
                </div>
              ) : (
                <div className="thumbnail-container">
                  {uploadedFiles.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded ${index + 1}`}
                      className="thumbnail"
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="popup-buttons">
          <button onClick={handleSubmit} className="submit-button">
            Submit
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

