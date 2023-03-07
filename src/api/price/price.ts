import axios from 'axios';
import config from '../../config/config';

export function createMonthlyPayment(data: { price: number; userId: string; planName: string }) {
  axios.post(`${config.apiAddress}/payment/monthly`, data).then((res) => {
    window.location = res.data;
  });
}

export function createYearlyPayment(data: { price: number; userId: string; planName: string }) {
  axios.post(`${config.apiAddress}/payment/yearly`, data).then((res) => {
    window.location = res.data;
  });
}
