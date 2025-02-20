import React from 'react'
import './Businesses.css'
import BusinessCard from '../../Components/BusinessCard/BusinessCard'
import New from '../../assets/Temp-Logo.jpeg'



{/* needs to be able to draw from data and make a list*/} 

const Businesses= () => {
    return (
      <div>
      <div className='BusinessPage'>
        <div className='all'> 

          <div className='BHeader'>
        <h1>Businesses </h1>
          <BusinessCard/>
          <BusinessCard/>
          <BusinessCard 
        businessName="Tara's Electronic Repair Emporium "
        logo={New}
        rating="5.0"
      />




          </div>

          <div className='BHeader'>
          <h1>Popular Businesses </h1>
          <BusinessCard/>
          <BusinessCard 
        businessName="VitalBrace Gagets"
        logo={New}
        rating="3.0"
      />


          </div>

          <div className='BHeader'>
          <h1> New Businesses </h1>
          <BusinessCard/>

          </div>

          <div className='BHeader'>
          <h1>For You </h1>
          
          <BusinessCard/>

          </div>
          
          
        </div>


</div>
</div>
  )
}

export default Businesses