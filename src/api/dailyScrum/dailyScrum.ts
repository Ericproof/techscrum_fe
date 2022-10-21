import axios from 'axios';
import config from '../../config/config';

export const getDailyScrums = async (projectId: string) => {
  return axios.get(`${config.apiAddress}/projects/${projectId}/dailyScrums`);
};

export const getDailyScrum = async (projectId: string, id: string) => {
  return axios.get(`${config.apiAddress}/projects/${projectId}/dailyScrums/${id}`);
};

export const createDailyScrum = async (projectId: string, data: any) => {
  return axios.post(`${config.apiAddress}/projects/${projectId}/dailyScrums`, data);
};

export const updateDailyScrum = async (projectId: string, id: string, data: any) => {
  return axios.put(`${config.apiAddress}/projects/${projectId}/dailyScrums/${id}`, data);
};

export const deleteDailyScrum = async (projectId: string, id: string) => {
  return axios.delete(`${config.apiAddress}/projects/${projectId}/dailyScrums/${id}`);
};
