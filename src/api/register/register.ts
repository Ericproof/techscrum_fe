import axios from 'axios';
import RegisterForm from './entity/register';
import config from '../../config/config';

export default async function register(registerForm: RegisterForm) {
  const path = `${config.apiAddress}/register`;
  try {
    const result = await axios.post(path, { registerForm }).then((res) => {
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
