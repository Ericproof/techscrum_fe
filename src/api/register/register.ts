import axios from 'axios';
import RegisterForm from './entity/register';
import config from '../../config/config';

export default async function register(emailToken: string, registerForm: RegisterForm) {
  const path = `${config.apiAddress}/register/${emailToken}`;
  const result = await axios.put(path, { ...registerForm });
  return result;
}
