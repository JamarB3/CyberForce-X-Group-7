import React from 'react';
import './BusinessCard.css';
import Coffee from '../../assets/Coffee-png.png';
import Star from '../../assets/Stars/Full.svg';

const BusinessCard = ({
  businessName = "Jaquan's Nail Salon and Barber Shop",
  logo = Coffee,
  rating = "4.8"
}) => {
  return (
    <div className="businessCard">
      <h1>{businessName}</h1>
      <div className="ratingContent">
        <img className="icon" src={logo} alt={`${businessName} Logo`} />
        <div className="ratingText">
          <p className="score">{rating}</p>
          <img className="star" src={Star} alt="Star" />
          <img className="star" src={Star} alt="Star" />
          <img className="star" src={Star} alt="Star" />
          <img className="star" src={Star} alt="Star" />
          <img className="star" src={Star} alt="Star" />
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
