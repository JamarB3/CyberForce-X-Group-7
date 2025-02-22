import React from 'react'
import './FeedItem.css'
import BLogo from '../../assets/Coffee-png.png'

const FeedItem = () => {
  return (
    <div className='FeedItem'>

        
        <div className='left'>
            <h2>Jaquan's Barber Shop and Hair Salon</h2>
            <div className="innerRating">
                <img  src={BLogo} className='BusinessLogo'/>
                <p>Overall <br /> Rating: <br/> 5 ★</p>
            </div>
            <p className='topReview'>"Best Nails in Town."</p>
        </div>


        <div className='right'>
            <button>See Full Portfolio</button>
            <div className="innerRating imgContainer">
                <img  src={BLogo}/>
                <img  src={BLogo}/>
                <img  src={BLogo}/>
            </div>
        </div>
    </div>
  )
}

export default FeedItem
