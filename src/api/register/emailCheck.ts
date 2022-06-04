import axios from 'axios';

export default async function emailCheck(email: string) {
  const path = process.env.API_ADDRESS || `http://192.168.1.111:8000/api/v1/register/${email}`;
  try {
    const result = await axios.get(path).then((res) => {
      console.log(res.data);
      return res.data;
    });
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      // 👇️ error: AxiosError<any, any>
      return error.message;
    }
    console.log('unexpected error: ', error);
    return 'An unexpected error occurred';
  }
}
