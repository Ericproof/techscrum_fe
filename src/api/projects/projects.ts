import axios from 'axios';
import config from '../../config/config';
import { IProjectData } from '../../types';

export function getProjects() {
  return axios.get(`${config.apiAddress}/projects`);
}

export function showProject(id: string) {
  return axios.get(`${config.apiAddress}/projects/${id}`);
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
