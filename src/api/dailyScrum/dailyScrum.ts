import axios, { AxiosInstance, AxiosResponse } from 'axios';
import config, { TIME_OUT } from '../../config/config';
import { IDailyScrumTicket } from '../../types';

const axiosConfig = {
  baseURL: `${config.apiAddress}/projects`,
  timeout: TIME_OUT,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
};

const http: AxiosInstance = axios.create(axiosConfig);

http.interceptors.response.use(
  (response): IDailyScrumTicket => {
    return response.data ?? response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getDailyScrums = (projectId: string, userId: string): Promise<IDailyScrumTicket[]> => {
  return http.get(`/${projectId}/dailyScrums`, {
    params: {
      userId
    }
  });
};

export const createDailyScrum = (
  projectId: string,
  data: any
): Promise<AxiosResponse<IDailyScrumTicket[]>> => {
  return http.post(`/${projectId}/dailyScrums`, data);
};

export const updateDailyScrum = async (
  projectId: string,
  dailyScrumsId: string,
  data: Partial<IDailyScrumTicket>
) => {
  return http.patch(`/${projectId}/dailyScrums/${dailyScrumsId}`, data);
};

export const deleteDailyScrum = async (projectId: string, taskId: string) => {
  return http.delete(`/${projectId}/dailyScrums`, {
    params: {
      taskId
    }
  });
};
