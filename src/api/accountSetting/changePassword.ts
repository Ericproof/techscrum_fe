import axios from 'axios';
import config from '../../config/config';

const getAuthHeader = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const changePassword = async (data: any, token) => {
  const path = `${config.apiAddress}/account/change-password`;
  const result = await axios.patch(path, data, getAuthHeader(token));
  return result;
};

export default changePassword;
