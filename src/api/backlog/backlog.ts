import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const getBacklogData = async () => {
  const path = 'http://localhost:8000/api/v1/backlogs';
  const response = await axios.get(path);
  return response.data;
};
