import axios from 'axios';

import config from '../../config/config';

export function getProjects() {
  return axios.get(`${config.apiAddress}/projects`);
}

export function show(id: string) {
  return axios.get(`${config.apiAddress}/projects/${id}`);
}

export function createProject(data: any) {
  return axios.post(`${config.apiAddress}/projects`, data);
}

export function deleteProject(id: any) {
  return axios.delete(`${config.apiAddress}/projects/${id}`);
}
