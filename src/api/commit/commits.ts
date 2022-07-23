import axios from 'axios';
import config from '../../config/config';
import { CreateComment } from './entity/commit';

export function getCommit(senderId = 'abc') {
  return axios.get(`${config.apiAddress}/commits/${senderId}`);
}

export function createComment(data: CreateComment) {
  return axios.post(`${config.apiAddress}/commits`, data);
}

export function updateCommit(id: string, content: string) {
  return axios.put(`${config.apiAddress}/commits/${id}`, { content });
}

export function deleteCommit(id: string) {
  return axios.delete(`${config.apiAddress}/commits/${id}`);
}
