import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

function AuthorizationRoute() {
  const isLogin = localStorage.getItem('refresh_token');
  return isLogin ? <Outlet /> : <Navigate to="/v2/login" />;
}

export default AuthorizationRoute;
