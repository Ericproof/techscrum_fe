import axios from 'axios';

export default async function emailCheck(email: string) {
  const path = process.env.API_ADDRESS || `http://192.168.1.111:8000/api/v1/register/${email}`;
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
