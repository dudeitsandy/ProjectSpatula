import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to sign in but save the attempted URL
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateRoute;
