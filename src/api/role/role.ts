import axios from 'axios';
import config from '../../config/config';

export const getRole = async () => {
  const path = `${config.apiAddress}/roles`;
  const res = await axios.get(path);
  return res;
};

export const updateRole = (id: string, permissionId: string) => {
  return axios.put(`${config.apiAddress}/roles/${id}/permission/${permissionId}`);
};
