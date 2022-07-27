import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserInfo } from '../types';
import { getUserInfo } from '../api/userProfile/userProfile';

const UserContext = createContext<IUserInfo>({});
const UserDispatchContext = createContext<Dispatch<SetStateAction<IUserInfo>>>(() => {});

interface ILoginInfoProvider {
  children?: React.ReactNode;
}

const projectRolesToObject = (projectsRoles: any) => {
  const obj: any = {};
  const keys = projectsRoles.map((item: any) => {
    return item.projectId;
  });

  for (let i = 0; i < keys.length; i += 1) {
    obj[keys[i]] = projectsRoles[i];
  }
  return obj;
};

function UserProvider({ children }: ILoginInfoProvider) {
  const [userInfo, setUserInfo] = useState<IUserInfo>({});
  const navigator = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async (token: string, refreshToken: string) => {
      try {
        const result = await getUserInfo(token, refreshToken);
        const { user } = result.data;
        const t = token || user.token;
        const projectRoles = JSON.stringify(projectRolesToObject(user.projectsRoles));
        setUserInfo({ ...user, token: t, projectRoles });
        localStorage.setItem('access_token', result.data.token ?? token);
        localStorage.setItem('refresh_token', result.data.refreshToken ?? refreshToken);
        localStorage.setItem(
          'user_project_roles',
          JSON.stringify(projectRolesToObject(user.projectsRoles))
        );
        localStorage.setItem('is_admin', user.isAdmin);
      } catch (e) {
        localStorage.clear();
        setUserInfo({});
        navigator('/login');
      }
    };

    const token = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (
      token !== undefined &&
      token != null &&
      refreshToken !== undefined &&
      refreshToken !== null
    ) {
      fetchUserInfo(token, refreshToken);
    }
  }, []);

  return (
    <UserContext.Provider value={userInfo}>
      <UserDispatchContext.Provider value={setUserInfo}>{children}</UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

UserProvider.defaultProps = {
  children: null
};

export { UserDispatchContext, UserContext, UserProvider };
