/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import config from '../../config/config';

export function getUsers() {
  return axios.get(`${config.apiAddress}/users`);
}
