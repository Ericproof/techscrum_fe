import axios from 'axios';
import config from '../../config/config';

export function updateRole(id: string, permissionId: string) {
  return axios.put(`${config.apiAddress}/roles/${id}/permissions/${permissionId}`);
}

export function removePermission(id: string, permissionId: string) {
  return axios.delete(`${config.apiAddress}/roles/${id}/permissions/${permissionId}`);
}
