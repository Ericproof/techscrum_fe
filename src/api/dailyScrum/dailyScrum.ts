import axios from 'axios';
import config from '../../config/config';

export const getDailyScrums = async (projectId: string) => {
  return axios.get(`${config.apiAddress}/projects/${projectId}/dailyScrums`);
};

export const getDailyScrum = async (projectId: string, userId: string) => {
  return axios.get(`${config.apiAddress}/projects/${projectId}/dailyScrums/${userId}`);
};

export const createDailyScrum = async (projectId: string, data: any) => {
  return axios.post(`${config.apiAddress}/projects/${projectId}/dailyScrums`, data);
};

export const updateDailyScrum = async (
  projectId: string,
  userId: string,
  taskId: string,
  data: any
) => {
  return axios.patch(
    `${config.apiAddress}/projects/${projectId}/dailyScrums/${userId}/${taskId}`,
    data
  );
};

export const deleteDailyScrum = async (projectId: string, taskId: string) => {
  return axios.delete(`${config.apiAddress}/projects/${projectId}/dailyScrums/${taskId}`);
};
