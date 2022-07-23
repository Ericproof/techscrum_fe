import axios from 'axios';
import config from '../../config/config';
import { ITaskData } from '../../types';

export function getTasks() {
  return axios.get(`${config.apiAddress}/projects`);
}

export function showTask(id: string) {
  return axios.get(`${config.apiAddress}/projects/${id}`);
}

export function createTask(data: ITaskData) {
  return axios.post(`${config.apiAddress}/projects`, data);
}

export function deleteTask(id: string) {
  return axios.delete(`${config.apiAddress}/projects/${id}`);
}

export function createNewTask(data: ITaskData) {
  return axios.post(`${config.apiAddress}/tasks`, data);
}

export function fetchTask(taskId: string) {
  return axios.get(`${config.apiAddress}/tasks/${taskId}`);
}

export function updateTask(taskId: string, data: ITaskData) {
  return axios.put(`${config.apiAddress}/tasks/${taskId}`, data);
}

export function updateTaskStatus(taskId: string, statusId: string, targetIndex: number) {
  return axios.put(`${config.apiAddress}/tasks/${taskId}`, { statusId, targetIndex });
}

export function removeTask(taskId: string) {
  return axios.delete(`${config.apiAddress}/tasks/${taskId}`);
}
