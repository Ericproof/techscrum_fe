/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import config from '../../config/config';

export const getBoard = async (id: string, input: string, users: string, taskTypes: string) => {
  let inputSearchCase = input;
  let userSearchCase = users;
  let taskTypeSearchCase = taskTypes;
  enum Cases {
    searchAll = 'all'
  }
  if (input === '') {
    inputSearchCase = Cases.searchAll;
  }
  if (users === '') {
    userSearchCase = Cases.searchAll;
  }
  if (taskTypes === '') {
    taskTypeSearchCase = Cases.searchAll;
  }
  const path = `${config.apiAddress}/board/${id}/${inputSearchCase}/${userSearchCase}/${taskTypeSearchCase}`;
  const result = await axios.get(path);
  return result.data;
};
