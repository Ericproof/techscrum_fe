import axios from 'axios';
import config from '../../config/config';

export const getDailyScrumByUser = async (projectId = '', userId = '') => {
  return axios.get(`${config.apiAddress}/projects/${projectId}/dailyScrums/${userId}`);
};

export const getDailyScrumWhenAssign = async (
  projectId = '',
  assignId = '',
  date = '',
  taskId = ''
) => {
  return axios.get(
    `${config.apiAddress}/projects/${projectId}/dailyScrums/${assignId}/date/${date}/tasks/${taskId}`
  );
};

export const getDailyScrumByTask = async (projectId = '', taskId = '') => {
  return axios.get(`${config.apiAddress}/projects/${projectId}/dailyScrums/tasks/${taskId}`);
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
