import { createPayment } from '../api/price/price';

export const createSubcription = async (
  id: string,
  domainURL: string,
  planIdentifier: number,
  paymentMode: boolean,
  isFreeTrial: boolean
) => {
  createPayment({ domainURL, planIdentifier, userId: id, paymentMode, isFreeTrial });
};
