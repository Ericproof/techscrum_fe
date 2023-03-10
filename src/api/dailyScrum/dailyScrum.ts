import axios, { AxiosInstance, AxiosResponse } from 'axios';
import config, { TIME_OUT } from '../../config/config';

export interface IDailyScrumTicket {
  title: string;
  progress: number;
  isFinished: boolean;
  hasReason: boolean;
  reason?: string;
  isNeedSupport: boolean;
  userId: { id: string };
  projectId: { id: string };
  taskId: { id: string };
  createdDate?: string;
  finishValidation?: boolean;
  supportValidation?: boolean;
  id: string;
  createAt: string;
}

const axiosConfig = {
  baseURL: `${config.apiAddress}/projects`,
  timeout: TIME_OUT,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
};

const http: AxiosInstance = axios.create(axiosConfig);

http.interceptors.response.use(
  (response) => {
    const updatedDataArr = response.data.map((item: IDailyScrumTicket) => ({
      ...item,
      projectId: item.projectId.id,
      userId: item.userId.id,
      taskId: item.taskId.id
    }));

    return updatedDataArr ?? response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getDailyScrums = (
  projectId = 'none',
  userId = 'none',
  taskId = 'none',
  date = 'none',
  searchCase = 'none'
): Promise<IDailyScrumTicket[]> => {
  return http.get(`/${projectId}/dailyScrums/${userId}/${taskId}/${date}/${searchCase}`);
};

export const createDailyScrum = (
  projectId: string,
  data: any
): Promise<AxiosResponse<IDailyScrumTicket[]>> => {
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
