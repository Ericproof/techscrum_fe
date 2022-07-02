/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import config from '../../config/config';

export const getBoard = async (id: string) => {
  const path = `${config.apiAddress}/board/${id}`;
  const result = await axios.get(path).then((res) => {
    return res.data[0];
  });
  return result;
};
