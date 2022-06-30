import axios from 'axios';
import config from '../../config/config';

const getBoard = async (id: string) => {
  const path = `${config.apiAddress}/board/${id}`;
  const result = await axios.get(path).then((res) => {
    return res.data[0];
  });
  return result;
};

export { getBoard };
