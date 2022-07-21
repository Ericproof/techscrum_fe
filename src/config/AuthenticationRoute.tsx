import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function AuthorizationRoute() {
  const isLogin = localStorage.getItem('refreshToken');
  return isLogin ? <Outlet /> : <Navigate to="/errorPage" />;
}

export default AuthorizationRoute;
