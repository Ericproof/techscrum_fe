/* eslint-disable import/no-import-module-exports */
import axios from 'axios';

export default {
  apiAddress: 'http://localhost:8000/api/v1'
};

const alphaApi = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
});

export { alphaApi };
