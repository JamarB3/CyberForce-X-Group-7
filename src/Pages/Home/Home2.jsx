import React from 'react'
import Marquee from 'react-fast-marquee'
import BusinessCard from '../../Components/BusinessCard/BusinessCard';



const Home2 = () => {
  return (
    <div className='Homepage gradient-text'>
        <h1>Hello World, Welcome to <span>InclusiFind</span></h1>
        <Marquee direction="right" speed={20}>

        <div className="flexContainer card_list">
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
          </Marquee>

    </div>
  )
}

export default Home2

