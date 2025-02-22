// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, children }) => {
  if (!loggedIn) {
    // If not logged in, redirect to the home page (or login page)
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
