import axios from 'axios';

import config from '../../config/config';

export default function getProjectDetails(id = '62ad4fddc23002b3426b7017') {
  return axios.get(`${config.apiAddress}/projects/${id}`);
}
