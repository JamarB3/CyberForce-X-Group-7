import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home/Home';
import ProfileCreation from './pages/ProfileCreation/ProfileCreation';
import BusinessProfileCreation from './pages/BusinessProfileCreation/BusinessProfileCreation';

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/profile' element={<ProfileCreation/>}/>
        <Route path='/businessprofile' element={<BusinessProfileCreation/>}/>
        
      </Routes>
    </div>
  );
};

export default App;