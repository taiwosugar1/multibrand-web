// src/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useAuth();
  
  console.log("Current User:", currentUser); // Debugging log

  return currentUser ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;