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
        const { user, userInfo: userProfile } = result.data;
        setUserInfo({ ...userProfile, token: result.data.token, email: user.email });
        localStorage.setItem('token', result.data.token ?? token);
        localStorage.setItem('refreshToken', result.data.refreshToken ?? refreshToken);
      } catch (e) {
        localStorage.clear();
        setUserInfo({});
        navigator('/login');
      }
    };

    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
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
