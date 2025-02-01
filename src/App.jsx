import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import './App.css';
import Home from './Pages/Home/Home';
import ReviewPage from './Pages/ReviewPage/ReviewPage'; // Import the ReviewPage component

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<ReviewPage />} /> {/* Route for the ReviewPage */}
      </Routes>
    </div>
  );
};

export default App;