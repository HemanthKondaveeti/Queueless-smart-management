// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';

const ProtectedRoute = ({ children, role }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const userRole = getUserRole();
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
