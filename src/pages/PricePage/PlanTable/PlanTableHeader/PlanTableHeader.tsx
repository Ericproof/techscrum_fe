import React from 'react';
import { createPayment } from '../../../../api/price/price';
import styles from './PlanTableHeader.module.scss';

interface IPlanTableHeaderProps {
  plans: any;
  isCheck: boolean;
}

function PlanTableHeader(props: IPlanTableHeaderProps) {
  const { plans, isCheck } = props;

  const ADVANCED_ID = 1;
  const ULTRA_ID = 2;

  const handleButtonClick = async (id: number) => {
    let price;
    if (id === ADVANCED_ID) {
      price = isCheck ? 49 : 29;
    }
    if (id === ULTRA_ID) {
      price = isCheck ? 149 : 59;
    }
    createPayment({ price });
  };

  return (
    <>
      <thead className={styles.head}>
        <tr className={styles.plan_tr}>
          <th className={styles.plan_th}>Plans</th>
          {plans.content.content.map((plan) => (
            <th key={plan.id}>
              {plan.plan}
              {plan.yearly_price && plan.monthly_price && !isCheck && (
                <span>{plan.yearly_price}</span>
              )}
              {plan.yearly_price && plan.monthly_price && isCheck && (
                <span>{plan.monthly_price}</span>
              )}
              {plan.yearly_price && !plan.monthly_price && <span>{plan.yearly_price}</span>}

              <button className={styles.action} onClick={() => handleButtonClick(plan.id)}>
                {plan.action}
              </button>
              {plan.buy_action && (
                <button className={styles.buy_action} onClick={() => handleButtonClick(plan.id)}>
                  {plan.buy_action}
                </button>
              )}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
}

export default PlanTableHeader;
