import axios from 'axios';
import config from '../../config/config';

export const userRegister = async (data: { email: string; company: string }) => {
  try {
    const response = await axios.post(`${config.apiAddress}/register`, data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) throw new Error(`Registration failed: ${error.message}`);
  }
  throw new Error('Registration failed: An unknown error occurred');
};
