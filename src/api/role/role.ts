import axios from 'axios';
import config from '../../config/config';

export const getRoles = async (projectId: string) => {
  const path = `${config.apiAddress}/projects/${projectId}/roles`;
  const response = await axios.get(path);
  return response.data;
};

export const getOneRoles = async (projectId: string, roleId: string) => {
  const path = `${config.apiAddress}/projects/${projectId}/roles/${roleId}`;
  const response = await axios.get(path);
  return response.data;
};

export const addRole = async (projectId: string, roleName: string, permissions: Array<string>) => {
  const path = `${config.apiAddress}/projects/${projectId}/roles`;
  const response = await axios.put(path, { roleName, permissions });
  return response.data;
};

export const updateRole = async (projectId: string, roleId: string, permissions: Array<string>) => {
  const path = `${config.apiAddress}/projects/${projectId}/roles/${roleId}`;
  const response = await axios.put(path, { permissions });
  return response.data;
};

export const deleteRole = async (projectId: string, roleId: string) => {
  const path = `${config.apiAddress}/projects/${projectId}/roles/${roleId}`;
  const response = await axios.delete(path);
  return response.data;
};

export const getPermissions = async () => {
  const path = `${config.apiAddress}/permissions`;
  const response = await axios.get(path);
  return response.data;
};
