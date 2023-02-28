/* eslint-disable import/prefer-default-export */
import axios from 'axios';
// import config from '../../config/config';

export const getBoard = async (id: string, input: string, users: string) => {
  let inputCase = input;
  let userCase = users;
  if (input === '') {
    inputCase = 'all';
  }
  if (users === '') {
    userCase = 'all';
  }
  const path = `http://localhost:8000/api/v1/board/${id}/${inputCase}/${userCase}`;
  const result = await axios.get(path);
  return result.data;
};
