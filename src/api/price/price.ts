import axios from 'axios';
import config from '../../config/config';

export function createPayment(data: { price: number }) {
  axios.post(`${config.apiAddress}/payment`, data).then((res) => {
    window.location = res.data;
  });
}
