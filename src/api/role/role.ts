import axios from 'axios';
import config from '../../config/config';
// eslint-disable-next-line import/prefer-default-export
export const updateRole = (id: string, permissionId: string) => {
  return axios.put(`${config.apiAddress}/roles/${id}/permission/${permissionId}`);
};
