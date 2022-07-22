/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import config from '../../config/config';
import { ILabelData } from '../../types';

export function getLabels(projectId: string) {
  return axios.get(`${config.apiAddress}/labels/${projectId}`);
}

export function showLabel(projectId: string) {
  return axios.get(`${config.apiAddress}/projects/${projectId}/labels`);
}

export function createLabel(data: ILabelData) {
  return axios.post(`${config.apiAddress}/labels`, data);
}
