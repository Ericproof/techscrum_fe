import axios from 'axios';
import RegisterForm from './entity/register';

export default async function register(registerForm: RegisterForm) {
  const path = process.env.API_ADDRESS || `http://192.168.1.111:8000/api/v1/register`;
  try {
    const result = await axios.post(path, { register }).then((res) => {
      return res.data;
    });
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 👇️ error: AxiosError<any, any>
      return error.message;
    }
    return 'An unexpected error occurred';
  }
}
