/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import config from '../../config/config';

export function createSprint(data: any) {
  return axios.post(`${config.apiAddress}/sprintsdsfsdfsdf`, data);
}
