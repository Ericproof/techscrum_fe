/* eslint-disable import/no-import-module-exports */
import axios from 'axios';

export default {
  apiAddress: 'https://afternoon-fortress-36104.herokuapp.com/api/v1'
};

const alphaApi = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
});

export { alphaApi };
