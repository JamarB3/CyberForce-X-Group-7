import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import './App.css'
import Home from './Pages/Home/Home'
import Businesses from './Pages/Businesses/Businesses'



const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />  
        <Route path='/Businesses' element={<Businesses />} />  



      </Routes>
    </div>
  )
}

export default App
