import axios from 'axios';
import config from '../../config/config';

export function createPayment(data: {
  domainURL: string;
  planIdentifier: number;
  userId: string;
  paymentMode: boolean;
  isFreeTrial: boolean;
}) {
  axios.post(`${config.apiAddress}/payment`, data).then((res) => {
    window.location = res.data;
  });
}
