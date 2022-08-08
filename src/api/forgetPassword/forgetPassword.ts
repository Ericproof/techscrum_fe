import axios from 'axios';

import config from '../../config/config';
import { IForgetPasswordForm } from '../../types';

export function forgetPasswordApply(forgetPasswordForm: IForgetPasswordForm) {
  return axios.post(`${config.apiAddress}/forget-password`, { ...forgetPasswordForm });
}

export function getForgetPasswordApplication(token: string) {
  return axios.get(`${config.apiAddress}/forget-password/${token}`);
}

export function setPassword(token: string, password: string) {
  return axios.put(`${config.apiAddress}/forget-password/${token}`, { password });
}
