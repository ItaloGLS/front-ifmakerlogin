import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../services/auth';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
