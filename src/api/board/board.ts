/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import config from '../../config/config';

export const getBoard = async (id: string, input: string, users: string, taskTypes: string) => {
  let inputCase = input;
  let userCase = users;
  let taskTypeCase = taskTypes;
  if (input === '') {
    inputCase = 'all';
  }
  if (users === '') {
    userCase = 'all';
  }
  if (taskTypes === '') {
    taskTypeCase = 'all';
  }
  const path = `${config.apiAddress}/board/${id}/${inputCase}/${userCase}/${taskTypeCase}`;
  const result = await axios.get(path);
  return result.data;
};
