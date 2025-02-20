import React from 'react'
import './Home.css'
import Coffee from '../../assets/Coffee-png.png'
import Full from '../../assets/Stars/Full.svg'
import Half from '../../assets/Stars/Half.svg'
import Empty from '../../assets/Stars/Empty.svg'
import BusinessCard from '../../components/BusinessCard/BusinessCard.jsx'

const Home = () => {
  console.log("Home component rendered");
  return (
    <div>

      {/* Landing/Welcome to InclusiFind */}

      <div className="flexContainer blueBox">
        <div className="flexContainer">
          <h1>Welcome to InclusiFind</h1>
        </div>
      </div>


      {/* Businesses Near You? Skeleton */}

      <div className=''>
        <p className="topLeft">Businesses Near You</p>
        <div className='flexContainer'>
          <div className="gridContainer">
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>



          </div>
        </div>
      </div>

      {/* Footer possible? */}
        

    </div>
  );
};

export default Home;