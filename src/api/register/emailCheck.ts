import axios from 'axios';
import config from '../../config/config';

export default async function emailCheck(email: string) {
  const path = `${config.apiAddress}/register/${email}`;
  try {
    const result = await axios.get(path).then((res) => {
      return res.data;
    });
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    }
    return 'An unexpected error occurred';
  }
}
