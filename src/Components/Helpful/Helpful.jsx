import React, { useState } from 'react';
import './Helpful.css';

const Helpful = ({ initialHelpfulCount }) => {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(initialHelpfulCount || 0); // Initialize with prop or 0

  const handleHelpfulClick = () => {
    setIsHelpful(!isHelpful);
    setHelpfulCount(isHelpful ? helpfulCount - 1 : helpfulCount + 1);
  };

  return (
    <div className="helpful-container">
      <span 
        className={`helpful-icon ${isHelpful ? 'helpful-selected' : ''}`}
        onClick={handleHelpfulClick}
      >
        👍
      </span>
      <span className="helpful-text">Is this helpful?</span>
      <span className="helpful-count">({helpfulCount})</span> {/* Display the count */}
    </div>
  );
};

export default Helpful;

