import React from 'react';
import { dummyReviews } from './data/dummyReviews';

const App = () => {
  return (
    <div>
      <h1>Our App! It works!</h1>
      <h2>User Reviews</h2>
      {dummyReviews.map((review) => (
        <div key={review.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
          <h3>{review.user}</h3>
          <p>Rating: {review.rating} Stars</p>
          <p>{review.review}</p>
          <small>Date: {review.date}</small>
        </div>
      ))}
    </div>
  );
};

export default App;
