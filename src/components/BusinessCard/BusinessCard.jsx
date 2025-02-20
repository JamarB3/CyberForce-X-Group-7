import React from 'react'
import './BusinessCard.css'
import Coffee from '../../assets/Coffee-png.png'
import Star from '../../assets/Stars/Full.svg'
const BusinessCard = () => {
  return (
    <div className="businessCard">
        <h1>Jaquan's Nail Salon and Barber Shop</h1>
        <div className="ratingContent">
            <img className="icon" src={Coffee} alt="Business Logo"/>
            <div className="ratingText">
                <p className="score">4.8</p>
                <img className="star" src={Star} alt="Star"/>
                <img className="star" src={Star} alt="Star"/>
                <img className="star" src={Star} alt="Star"/>
                <img className="star" src={Star} alt="Star"/>
                <img className="star" src={Star} alt="Star"/>
            </div>
            <p className="distance"></p>
        </div>
    </div>
  );
};

export default BusinessCard;
