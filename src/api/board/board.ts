import axios from 'axios';
import config from '../../config/config';

const getBoard = async () => {
  const path = `${config.apiAddress}/board/62b0b2c4814630be771dd8b8`;
  const result = await axios.get(path).then((res) => {
    return res.data[0];
  });
  return result;
};

export default getBoard;
