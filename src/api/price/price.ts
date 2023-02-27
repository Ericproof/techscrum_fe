import axios from 'axios';
import config from '../../config/config';

export function createAdvancedPayment(data: { price: number }) {
  axios.post(`${config.apiAddress}/payment/advanced`, data).then((res) => {
    window.location = res.data;
  });
}

export function createUltraPayment(data: { price: number }) {
  axios.post(`${config.apiAddress}/payment/ultra`, data).then((res) => {
    window.location = res.data;
  });
}
