/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import config from '../../config/config';
import { IUserInfo } from '../../types';

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

export async function getUsers() {
  const userListLocalStorage = localStorage.getItem('users_list');
  if (userListLocalStorage) {
    return { data: JSON.parse(userListLocalStorage) };
  }
  const res = await axios.get(`${config.apiAddress}/users`);
  localStorage.setItem('users_list', JSON.stringify(res.data));
  return res.data;
}

export function updateMe(data: IUserInfo, token: string) {
  return axios.put(`${config.apiAddress}/account/me`, data, getAuthHeader(token));
}
