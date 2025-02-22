import React from 'react'
import './Feed.css'
import FeedItem from '../../Components/FeedItem/FeedItem'

const Feed = () => {
  return (
    <div className='Feedpage'>
      <div className="Feedtop">
        <h1>Your Feed</h1>
        <p>...Based on your interest in <span class="tag">Beauty</span><span class="tag">Cooking</span><span class="tag">...</span></p>
      </div>
      <div className='YourFeed'>
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />

        
        

      </div>
      <div className='Feedpage-bottom'/>
    </div>
  )
}

export default Feed
