import axios from 'axios';
import config from '../../config/config';

export const getRoles = async () => {
  const path = `${config.apiAddress}/roles`;
  const response = await axios.get(path);
  return response.data;
};

export const getRole = async () => {
  const path = `${config.apiAddress}/roles`;
  const res = await axios.get(path);
  return res;
};

export const addRole = async (data: object) => {
  const configHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token') ?? ''}`
    }
  };
  const path = `${config.apiAddress}/roles`;
  const response = await axios.post(path, data, configHeader);
  return response.data;
};

export const deleteRole = async (roleId: string) => {
  const configHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token') ?? ''}`
    }
  };
  const path = `${config.apiAddress}/tasks/${roleId}`;
  const response = await axios.delete(path, configHeader);
  return response.data;
};

export const updateRoleNew = async (roleId: string, data: object) => {
  const configHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token') ?? ''}`
    }
  };
  const path = `${config.apiAddress}/roles/${roleId}`;
  const response = await axios.put(path, data, configHeader);
  return response.data;
};

export function updateRole(id: string, permissionId: string) {
  return axios.put(`${config.apiAddress}/roles/${id}/permissions/${permissionId}`);
}

export function removePermission(id: string, permissionId: string) {
  return axios.delete(`${config.apiAddress}/roles/${id}/permissions/${permissionId}`);
}
