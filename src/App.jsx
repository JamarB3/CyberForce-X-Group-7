import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import './App.css'
import Home from './Pages/Home/Home'
import Businesses from './Pages/Businesses/Businesses'
import Maps from './Pages/Maps/Maps'
import ReviewPage from './Pages/ReviewPage/ReviewPage'; // Import the ReviewPage component
import ProfileCreation from './pages/ProfileCreation/ProfileCreation';
import BusinessProfileCreation from './pages/BusinessProfileCreation/BusinessProfileCreation';
import GalleryPage from './Pages/GalleryPage/GalleryPage';

const App = () => {
  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/Businesses' element={<Businesses />} />  
        <Route path='/Maps' element={<Maps />} />
        <Route path="/reviews" element={<ReviewPage />} /> {/* Route for the ReviewPage */}
        <Route path='/profile' element={<ProfileCreation/>}/>
        <Route path='/businessprofile' element={<BusinessProfileCreation/>}/>
        <Route path='/GalleryPage' element={<GalleryPage/>}/>
      </Routes>
    </div>
  );
};

export default App;