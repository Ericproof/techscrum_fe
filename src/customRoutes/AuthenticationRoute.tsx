import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import { ProjectProvider } from '../context/ProjectProvider';
import { TaskTypesProvider } from '../context/TaskTypeProvider';
import { RolesProvider } from '../context/UserPermissionProvider';

function AuthorizationRoute() {
  const isLogin = localStorage.getItem('refresh_token');
  if (isLogin) {
    return (
      <RolesProvider>
        <ProjectProvider>
          <TaskTypesProvider>
            <Outlet />
          </TaskTypesProvider>
        </ProjectProvider>
      </RolesProvider>
    );
  }
  return <Navigate to="/login" />;
}

export default AuthorizationRoute;
