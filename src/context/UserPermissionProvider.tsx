import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import config from '../config/config';

const RolesContext = createContext<any>({});

interface IRolesProvider {
  children?: React.ReactNode;
}

const convertRolesArrayToObject = (roles: any) => {
  const obj: any = {};
  const keys = roles.map((item: any) => {
    return item.id;
  });

  for (let i = 0; i < keys.length; i += 1) {
    obj[keys[i]] = roles[i];
  }
  return obj;
};

function RolesProvider({ children }: IRolesProvider) {
  const [roles, setRoles] = useState<any>([]);

  const getRoles = async () => {
    const path = `${config.apiAddress}/roles`;
    const res = await axios.get(path);
    const obj = convertRolesArrayToObject(res.data);
    setRoles(obj);
    localStorage.setItem('roles', JSON.stringify(obj));
  };

  useEffect(() => {
    getRoles();
  }, []);

  return <RolesContext.Provider value={roles}>{children}</RolesContext.Provider>;
}

RolesProvider.defaultProps = {
  children: null
};

export { RolesContext, RolesProvider };
