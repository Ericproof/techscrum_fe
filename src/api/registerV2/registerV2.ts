import axios from 'axios';

export const userRegister = async (data) => {
  return axios.post(`http://localhost:8000/api/v1/registerV2`, data);
};
