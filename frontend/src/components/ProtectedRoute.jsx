import { Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';

const ProtectedRoute = ({ currentUser, children }) => {
  if (!currentUser) {
    return <Navigate to='/' />;
  }

  return children;
};

export default ProtectedRoute;
