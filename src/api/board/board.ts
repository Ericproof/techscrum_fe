/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import config from '../../config/config';

export const getBoard = async (id: string, input: string, users: string, taskTypes: string) => {
  let inputCase = input;
  let userCase = users;
  let taskTypeCase = taskTypes;
  enum Cases {
    searchAllCase = 'all'
  }
  if (input === '') {
    inputCase = Cases.searchAllCase;
  }
  if (users === '') {
    userCase = Cases.searchAllCase;
  }
  if (taskTypes === '') {
    taskTypeCase = Cases.searchAllCase;
  }
  const path = `${config.apiAddress}/board/${id}/${inputCase}/${userCase}/${taskTypeCase}`;
  const result = await axios.get(path);
  return result.data;
};
