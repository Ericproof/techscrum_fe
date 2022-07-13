import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { IUserInfo } from '../types';

const UserContext = createContext<IUserInfo>({});
const UserDispatchContext = createContext<Dispatch<SetStateAction<IUserInfo>>>(() => {});

interface ILoginInfoProvider {
  children: any;
}

function UserProvider({ children }: ILoginInfoProvider) {
  const [userInfo, setUserInfo] = useState<IUserInfo>({});

  return (
    <UserContext.Provider value={userInfo}>
      <UserDispatchContext.Provider value={setUserInfo}>{children}</UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export { UserDispatchContext, UserContext, UserProvider };
