import React, { useState } from 'react';
import './EditDelete.css';
import ReviewPopup from '../ReviewPopup/ReviewPopup'; // Import the review popup

const EditDelete = ({ review, onDelete, onEdit }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(review.id);
    setShowConfirm(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = (editedReview) => {
    onEdit(review.id, editedReview);
    setIsEditing(false);
  };

  return (
    <div className="edit-delete-container">
      <span className="edit-icon" onClick={handleEditClick} title="Edit">
        ✏️
      </span>
      <span className="delete-icon" onClick={handleDeleteClick} title="Delete">
        🗑️
      </span>

      {showConfirm && (
        <div className="confirm-delete-overlay">
          <div className="confirm-delete-popup">
            <p>Are you sure you want to delete this review?</p>
            <button onClick={handleConfirmDelete} className='yes-button'>Yes</button>
            <button onClick={() => setShowConfirm(false)} className='no-button'>No</button>
          </div>
        </div>
      )}

      {isEditing && (
        <ReviewPopup 
          review={review} // Pass the review data to the popup
          onClose={handleCloseEdit} 
          onSubmit={handleSaveEdit} 
          isEditing={true} // Indicate that it's an edit
        />
      )}
    </div>
  );
};

export default EditDelete;