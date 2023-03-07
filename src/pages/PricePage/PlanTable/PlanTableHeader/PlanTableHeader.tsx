import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMonthlyPayment, createYearlyPayment } from '../../../../api/price/price';
import { UserContext } from '../../../../context/UserInfoProvider';
import styles from './PlanTableHeader.module.scss';

interface IPlanTableHeaderProps {
  plans: any;
  isCheck: boolean;
}

function PlanTableHeader(props: IPlanTableHeaderProps) {
  const navigate = useNavigate();
  const { plans, isCheck } = props;
  const ADVANCED_ID = 1;
  const ULTRA_ID = 2;
  const userInfo = useContext(UserContext);
  const { id: userId, email } = userInfo;
  let planName: string;

  const handleButtonClick = async (id: number) => {
    if (userId && email) {
      let price;
      if (id === ADVANCED_ID) {
        price = isCheck ? 49 : 29;
        if (price === 49) {
          planName = 'Advanced monthly plan';
          createMonthlyPayment({ price, userId, planName });
        } else {
          planName = 'Advanced yearly plan';
          price = 348;
          createYearlyPayment({ price, userId, planName });
        }
      }
      if (id === ULTRA_ID) {
        price = isCheck ? 149 : 59;
        if (price === 149) {
          planName = 'Ultra monthly plan';
          createMonthlyPayment({ price, userId, planName });
        } else {
          planName = 'Ultra yearly plan';
          price = 708;
          createYearlyPayment({ price, userId, planName });
        }
      }
    } else {
      navigate(`/login`);
    }
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
