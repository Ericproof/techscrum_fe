import axios from 'axios';
import config from '../../config/config';
import { IProjectData, IUserInfo } from '../../types';

const getAuthHeader = (token: string) => {
  return {
    headers: {
      authorization: `Bearer ${token}`
    }
  };
};

export function getProjects() {
  return axios.get(`${config.apiAddress}/projects`);
}

export function showProject(id: string, token: string) {
  return axios.get(`${config.apiAddress}/projects/${id}`, getAuthHeader(token));
}

export function createProject(data: IProjectData) {
  return axios.post(`${config.apiAddress}/projects`, data);
}

export function deleteProject(id: string) {
  return axios.delete(`${config.apiAddress}/projects/${id}`);
}

export function updateProject(id: string, data: IProjectData) {
  return axios.put(`${config.apiAddress}/projects/${id}`, data);
}
