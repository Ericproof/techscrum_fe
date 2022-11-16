import axios from 'axios';
import config from '../../config/config';

const changePassword = async (data: any) => {
  const path = `${config.apiAddress}/account/change-password`;

  const result = await axios.patch(path, data);
  return result;
};

export default changePassword;
