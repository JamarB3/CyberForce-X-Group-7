import React, { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios'; // <-- Add this line

import Navbar from './Components/Navbar/Navbar';
import './index.css';
import Home from './Pages/Home/Home';
import Feed from './Pages/Feed/Feed';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

const App = () => {
    const [modal, setModal] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    axios.defaults.withCredentials = true;

    console.log("Google OAuth Client ID:", import.meta.env.VITE_OAUTH);




    useEffect(() => {
      axios.get("http://localhost:3001/api/users/me", { withCredentials: true })
          .then(response => {
              console.log("User session verified:", response.data);
              setUser(response.data);
              setLoggedIn(true);
          })
          .catch(() => {
              setLoggedIn(false);
          });
  }, []);
    
  


  return (
    <GoogleOAuthProvider clientId="906018796749-atv6os00qod5dctqpu5isanfva29an07.apps.googleusercontent.com">
      <Navbar setUser={setUser} setLoggedIn={setLoggedIn} loggedIn={loggedIn} user={user} />
      <Routes>
        <Route path='/' element={<Home loggedIn={loggedIn} />} />
        <Route path='/Feed' element={        <ProtectedRoute loggedIn={loggedIn}><Feed/></ProtectedRoute>
} />  

        </Routes>
    </GoogleOAuthProvider>
  );
};

createRoot(document.getElementById('root')).render(<App />);

export default App;



