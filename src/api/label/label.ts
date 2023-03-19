import axios from 'axios';
import config from '../../config/config';
import { ILabelData } from '../../types';

export function getLabels(projectId: string) {
  return axios.get(`${config.apiAddressV2}/labels/${projectId}`);
}

export function showLabel(projectId: string) {
  return axios.get(`${config.apiAddressV2}/projects/${projectId}/labels`);
}

export function removeLabel(taskId: string, labelId: string) {
  return axios.delete(`${config.apiAddressV2}/tasks/${taskId}/labels/${labelId}`);
}

export function createLabel(taskId: string, data: ILabelData) {
  return axios.post(`${config.apiAddressV2}/tasks/${taskId}/labels`, data);
}

export function deleteLabel(id: string) {
  return axios.delete(`${config.apiAddressV2}/labels/${id}`);
}
