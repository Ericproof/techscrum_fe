import axios from 'axios';
import { Login } from './entity/login';
// import config from '../../config/config';

export default async function loginv2(loginForm: Login) {
  const path = `http://localhost:8000/api/v1/loginv2`;
  const result = await axios.post(path, { ...loginForm });
  return result;
}
