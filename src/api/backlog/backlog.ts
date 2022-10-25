import axios from 'axios';
import config from '../../config/config';

// eslint-disable-next-line import/prefer-default-export
export const getBacklog = async (projectId: string) => {
  const path = `${config.apiAddress}/projects/${projectId}/backlogs`;
  const response = await axios.get(path);
  return response.data;
};

export const addTask = async (data: object) => {
  const configHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token') ?? ''}`
    }
  };
  const path = `${config.apiAddress}/tasks`;
  const response = await axios.post(path, data, configHeader);
  return response.data;
};

export const updateTask = async (id: string, data: object) => {
  const configHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token') ?? ''}`
    }
  };
  const path = `${config.apiAddress}/tasks/${id}`;
  const response = await axios.put(path, data, configHeader);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const configHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token') ?? ''}`
    }
  };
  const path = `${config.apiAddress}/tasks/${id}`;
  const response = await axios.delete(path, configHeader);
  return response.data;
};
