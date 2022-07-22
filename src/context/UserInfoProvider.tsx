import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserInfo } from '../types';
import { getUserInfo } from '../api/userProfile/userProfile';

const UserContext = createContext<IUserInfo>({});
const UserDispatchContext = createContext<Dispatch<SetStateAction<IUserInfo>>>(() => {});

interface ILoginInfoProvider {
  children?: React.ReactNode;
}

function UserProvider({ children }: ILoginInfoProvider) {
  const [userInfo, setUserInfo] = useState<IUserInfo>({});
  const navigator = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async (token: string, refreshToken: string) => {
      try {
        const result = await getUserInfo(token, refreshToken);
        const { user } = result.data;
        const t = token || user.token;
        setUserInfo({ ...user, token: t });
        localStorage.setItem('access_token', result.data.token ?? token);
        localStorage.setItem('refresh_token', result.data.refreshToken ?? refreshToken);
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
