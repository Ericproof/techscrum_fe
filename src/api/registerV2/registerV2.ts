import axios from 'axios';
import config from '../../config/config';

export const userRegister = async (data) => {
  return axios.post(`${config.apiAddress}/registerV2`, data);
};
