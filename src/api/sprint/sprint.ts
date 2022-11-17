/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import config from '../../config/config';

export const createSprint = async (data: any) => {
  const response = await axios.post(`${config.apiAddress}/sprints`, data);
  return response.data;
};
