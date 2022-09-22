/* eslint-disable no-param-reassign */
/* eslint-disable import/no-import-module-exports */
import axios from 'axios';

export default {
  apiAddress: 'https://afternoon-fortress-36104.herokuapp.com/api/v1'
  // apiAddress: 'http://localhost:8000/api/v1'
};

const alphaApi = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
});

alphaApi.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Content-Type'] = 'application/json';

  return config;
});

export { alphaApi };
