import axios from 'axios';
import config from '../../config/config';

export const getAllDailyScrums = async (projectId: string) => {
  return axios.get(`${config.apiAddress}/projects/${projectId}/dailyScrums`);
};

export const getOneDailyScrum = async (projectId: string, id: string) => {
  return axios.get(`${config.apiAddress}/projects/${projectId}/dailyScrums/${id}`);
};

export const createOneDailyScrum = async (projectId: string, data: any) => {
  return axios.post(`${config.apiAddress}/projects/${projectId}/dailyScrums`, data);
};

export const updateOneDailyScrum = async (projectId: string, id: string, data: any) => {
  return axios.put(`${config.apiAddress}/projects/${projectId}/dailyScrums/${id}`, data);
};

export const deleteOneDailyScrum = async (projectId: string, id: string) => {
  return axios.delete(`${config.apiAddress}/projects/${projectId}/dailyScrums/${id}`);
};
