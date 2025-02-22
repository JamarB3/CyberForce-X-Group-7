import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Coffee from '../../assets/Coffee-png.png';
import Full from '../../assets/Stars/Full.svg';
import Half from '../../assets/Stars/Half.svg';
import Empty from '../../assets/Stars/Empty.svg';
import BusinessCard from '../../Components/BusinessCard/BusinessCard';

const Home = ({ loggedIn }) => {
  const navigate = useNavigate();
  
    useEffect(() => {
    if (loggedIn) {
        console.log("LoggedIn:", loggedIn);
        navigate('/feed');
    }
    }, [loggedIn, navigate]);



  return (
    <div className='Homepage gradient-text'>
      {/* Landing/Welcome to InclusiFind */}
      <div className="flexContainer blueBox">
        <div className="flexContainer">
          <h1>
            Welcome to <span>InclusiFind</span>
            <br />
            Search
          </h1>
          <h2></h2>
        </div>
      </div>

      {/* Businesses Near You? Skeleton */}
      <div className=''>
        <p className="topLeft">Explore Hundreds of Minority Owned Businesses</p>
        <div className='flexContainer'>
          <div className="gridContainer">
            <BusinessCard />
            <BusinessCard />
            <BusinessCard />
            <BusinessCard />
            <BusinessCard />
            <BusinessCard 
        businessName="New Business Name"
        logo={`https://picsum.photos/200/300`}
        rating="5.0"
      />
          </div>
        </div>
      </div>

      {/* Footer possible? */}
    </div>
  );
};

export default Home;
