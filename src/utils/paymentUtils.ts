import { createMonthlyPayment, createYearlyPayment } from '../api/price/price';

export const createAdvancedPayment = async (id: string, advancedPlanPrice: number) => {
  if (advancedPlanPrice === 49) {
    const planName = 'Advanced monthly plan';
    createMonthlyPayment({ price: advancedPlanPrice, userId: id, planName });
  } else {
    const planName = 'Advanced yearly plan';
    const totalPrice = 348;
    createYearlyPayment({ price: totalPrice, userId: id, planName });
  }
};

export const createUltraPayment = async (id: string, ultraPlanPrice: number) => {
  if (ultraPlanPrice === 149) {
    const planName = 'Ultra monthly plan';
    createMonthlyPayment({ price: ultraPlanPrice, userId: id, planName });
  } else {
    const planName = 'Ultra yearly plan';
    const totalPrice = 708;
    createYearlyPayment({ price: totalPrice, userId: id, planName });
  }
};
