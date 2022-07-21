import axios from 'axios';
import config from '../../config/config';
import { CreateCommit } from './entity/commit';

export function getCommit(senderId: string) {
  return axios.get(`${config.apiAddress}/commits/${senderId}`);
}

export function createCommit(createCommit: CreateCommit) {
  return axios.post(`${config.apiAddress}/commits`, { ...createCommit });
}

export function updateCommit(id: string, content: string) {
  return axios.put(`${config.apiAddress}/commits`);
}

export function deleteCommit(id: string) {
  return axios.delete(`${config.apiAddress}/commits/${id}`);
}
