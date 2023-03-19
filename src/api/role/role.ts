import axios from 'axios';
import config from '../../config/config';

export function updateRole(id: string, permissionId: string) {
  return axios.put(`${config.apiAddressV2}/roles/${id}/permissions/${permissionId}`);
}

export function removePermission(id: string, permissionId: string) {
  return axios.delete(`${config.apiAddressV2}/roles/${id}/permissions/${permissionId}`);
}

export const getRole = async () => {
  const path = `${config.apiAddressV2}/roles`;
  const res = await axios.get(path);
  return res;
};
