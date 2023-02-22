import axios from 'axios';
import config from '../../config/config';

// 正确
export const getRoles = async () => {
  const path = `${config.apiAddress}/roles`;
  const response = await axios.get(path);
  return response.data;
};

export const updatePermission = async (roleId: string, permissionId: string, data: object) => {
  const path = `${config.apiAddress}/roles/${roleId}/permissions/${permissionId}`;
  const response = await axios.put(path, data);
  return response.data;
};

export const getPermission = async () => {
  const path = `${config.apiAddress}/permissions`;
  const response = await axios.get(path);
  return response.data;
};

// 正确
export function deletePermission(id: string, permissionId: string) {
  return axios.delete(`${config.apiAddress}/roles/${id}/permissions/${permissionId}`);
}

// ----------------
// ----------------
// ----------------

// 后端api还没写
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

// 旧版
export function updateRole(id: string, permissionId: string) {
  return axios.put(`${config.apiAddress}/roles/${id}/permissions/${permissionId}`);
}
export const getRole = async () => {
  const path = `${config.apiAddress}/roles`;
  const res = await axios.get(path);
  return res;
};
