/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import config from '../../config/config';

export function getLabels(projectId: string) {
  return axios.get(`${config.apiAddress}/labels/${projectId}`);
}
