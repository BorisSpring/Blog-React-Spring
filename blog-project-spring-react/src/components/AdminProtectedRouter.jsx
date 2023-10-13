import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useGetLoggedUser } from '../hooks/useGetLoggedUser';
import LoadingSpinner from './LoadingSpinner';

const AdminProtectedRouter = () => {
  const { loggedUser, isLoading } = useGetLoggedUser();

  if (isLoading) return <LoadingSpinner />;
  return loggedUser?.id ? <Outlet /> : <Navigate to='/login' replace />;
};

export default AdminProtectedRouter;
