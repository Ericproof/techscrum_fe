import axios from 'axios';
import config from '../../config/config';

export default async function projectsDetail(id: string) {
  const path = `${config.apiAddress}/projects/${id}`;
  try {
    const result = await axios.get(path).then((res) => {
      console.log(res.data);
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
