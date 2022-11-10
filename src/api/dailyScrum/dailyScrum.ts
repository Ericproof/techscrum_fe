import axios from 'axios';
import config from '../../config/config';

export const getDailyScrums = async (
  projectId = 'none',
  userId = 'none',
  taskId = 'none',
  date = 'none'
) => {
  return axios.get(
    `${config.apiAddress}/projects/${projectId}/dailyScrums/${userId}/${taskId}/${date}`
  );
};

export const createDailyScrum = async (projectId: string, data: any) => {
  return axios.post(`${config.apiAddress}/projects/${projectId}/dailyScrums`, data);
};

export const updateDailyScrum = async (data: any, projectId = '', userId = '', taskId = '') => {
  return axios.patch(
    `${config.apiAddress}/projects/${projectId}/dailyScrums/${userId}/${taskId}`,
    data
  );
};

export const deleteDailyScrum = async (projectId = '', taskId = '') => {
  return axios.delete(`${config.apiAddress}/projects/${projectId}/dailyScrums/${taskId}`);
};
