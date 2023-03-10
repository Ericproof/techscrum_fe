import axios from 'axios';
import RegisterForm from './entity/register';
import config from '../../config/config';

export const register = async (emailToken: string, registerForm: RegisterForm) => {
  const path = `${config.apiAddress}/register/${emailToken}`;
  const result = await axios.put(path, { ...registerForm });
  return result;
};

export const registerV2 = async (emailToken: string, registerForm: RegisterForm) => {
  const path = `http://localhost:8000/api/v1/registerV2/${emailToken}`;
  const result = await axios.put(path, { ...registerForm });
  return result;
};
