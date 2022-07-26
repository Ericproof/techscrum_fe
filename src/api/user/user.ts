/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import config from '../../config/config';

const getAuthHeader = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export function getUser(id: string) {
  return axios.get(`${config.apiAddress}/users/${id}`);
}

export function getUsers() {
  return axios.get(`${config.apiAddress}/users`);
}

export function updateMe(data: any, token: string) {
  return axios.put(`${config.apiAddress}/account/me`, data, getAuthHeader(token));
}
