import axios from 'axios';
import config from '../../config/config';

export async function emailCheck(email: string) {
  const path = `${config.apiAddress}/register/${email}`;
  const result = await axios.post(path);
  return result;
}

export async function emailVerifyCheck(emalToken: string) {
  const path = `${config.apiAddress}/register/${emalToken}`;
  const result = await axios.get(path);
  return result;
}
