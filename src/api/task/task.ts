import axios from 'axios';
import config from '../../config/config';

export function getTasks() {
  return axios.get(`${config.apiAddress}/projects`);
}

export function showTask(id: string) {
  return axios.get(`${config.apiAddress}/projects/${id}`);
}

export function createTask(data: any) {
  return axios.post(`${config.apiAddress}/projects`, data);
}

export function deleteTask(id: any) {
  return axios.delete(`${config.apiAddress}/projects/${id}`);
}

export function createNewTask(data: any) {
  return axios.post(`${config.apiAddress}/tasks`, data);
}

export function updateTask(taskId: string, data: any) {
  return axios.put(`${config.apiAddress}/tasks/${taskId}`, data);
}

export function updateTaskStatus(taskId: string, statusId: number) {
  return axios.put(`${config.apiAddress}/tasks/${taskId}`, { status_id: statusId });
}
