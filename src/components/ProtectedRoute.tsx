import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <main className="page-content"><p>Checking administrator access…</p></main>;

  if (!isAdmin) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
