import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useGetLoggedUser } from './users/useGetLoggedUser';
import LoadingSpinner from '../LoadingSpinner';

const AdminProtectedRouter = () => {
  const { loggedUser, isLoading } = useGetLoggedUser();

  if (isLoading) return <LoadingSpinner />;
  return loggedUser?.id ? <Outlet /> : <Navigate to='/login' replace />;
};

export default AdminProtectedRouter;
