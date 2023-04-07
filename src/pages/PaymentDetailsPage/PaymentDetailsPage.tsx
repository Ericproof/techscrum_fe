import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiUser } from 'react-icons/hi';
import axios from 'axios';
import MainMenuV2 from '../MainMenuV2/MainMenuV2';
import SubSettingMenu from '../../lib/SubSettingMenu/SubSettingMenu';
import styles from './PaymentDetailsPage.module.scss';
import mention from '../../assets/creditCards.svg';
import InvoiceForm from './InvoiceForm/InvoiceForm';
import CreditCardForm from './CreditCardForm/CreditCardForm';
import { paymentButtons } from '../../utils/billingButtons';
import config from '../../config/config';
import { UserContext } from '../../context/UserInfoProvider';

type BillOverviewInfo = {
  amount: number;
  planName: string;
  periodStart: string;
  periodEnd: string;
  customerName: string;
  customerEmail: string;
  freeTrialDuration: number;
};
export default function PaymentDetailsPage() {
  const [billOverviewInfo, setBillOverviewInfo] = useState<BillOverviewInfo | null>(null);
  const [isSubscribePlan, setIsSubscribePlan] = useState(false);
  const [isUserFreeTrial, setIsUserFreeTrial] = useState(false);

  const userInfo = useContext(UserContext);
  const { id: userId } = userInfo;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.post(`${config.apiAddress}/payment/info/billingOverview`, {
        userId
      });
      setBillOverviewInfo(res.data);
    };

    const checkIsSubscribePlan = async () => {
      const res = await axios.get(`${config.apiAddress}/payment/check/isUserSubscribePlan`, {});
      setIsSubscribePlan(res.data);
    };

    const checkIsUserFreeTrial = async () => {
      const res = await axios.get(`${config.apiAddress}/payment/check/isUserFreeTrial`, {});
      setIsUserFreeTrial(res.data);
    };

    fetchData();
    checkIsSubscribePlan();
    checkIsUserFreeTrial();
  }, [userId]);

  return (
    <>
      <div className={styles.pageContainer}>
        <MainMenuV2 />
        <SubSettingMenu items={paymentButtons} />
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Billing details</h2>
          <div className={styles.flexRow}>
            <div className={styles.mainColumn}>
              {!isSubscribePlan ? (
                <div className={styles.creditCards__container}>
                  <img src={mention} alt="mention" className={styles.creditCardImg} />
                  <Link to="/billing/paymentdetails/add">
                    <button className={styles.pageBtn}>Add payment method</button>
                  </Link>
                  <p className={styles.textSecondary}>We accept all major credit/debit cards</p>
                </div>
              ) : (
                <CreditCardForm />
              )}

              <h3>Contact details</h3>
              <div>
                <div className={styles.billingContactTitle}>
                  <h4>Billing contact</h4>
                  <div className={styles.tooltip}>
                    <span className={styles.infoIcon}>i</span>
                    <div className={styles.tooltip__pop}>
                      <p>
                        Billing contacts have access to this site. They are contacted with invoicing
                        or billing enquiries and can raise support requests.
                      </p>
                      <p>
                        However, only the primary billing contact will receive orders and invoices.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.flexAlign}>
                  <HiUser className={styles.userIcon} color="white" fontSize="2.5rem" />
                  <div>
                    <p>{billOverviewInfo?.customerName}</p>
                    <p className={styles.textSecondary}>{billOverviewInfo?.customerEmail}</p>
                  </div>
                </div>
              </div>
              <InvoiceForm invoiceEmail={billOverviewInfo?.customerEmail} />
              <p className={styles.textSecondary}>
                Your credit card issuer may charge foreign transaction or cross-border fees in
                addition to the total price above.
              </p>
            </div>

            {isSubscribePlan ? (
              <div className={styles.sideColumn}>
                <div>
                  <h4>Current Bill</h4>
                  <p className={styles.textSecondary}>
                    {billOverviewInfo?.periodStart} {billOverviewInfo?.periodEnd}
                  </p>
                </div>
                <div className={styles.sideColumn__main}>
                  <p className={`${styles.currentPlan} ${styles.flexBetween}`}>
                    <span>{billOverviewInfo?.planName}</span>
                    <span>$0.00</span>
                  </p>
                  {isUserFreeTrial && (
                    <>
                      <p className={`${styles.planBtn} ${styles.trialBtn}`}>FREE TRIAL</p>
                    </>
                  )}
                </div>
                <div className={styles.sideColumn__footer}>
                  <p className={`${styles.textSecondary} ${styles.flexBetween}`}>
                    <span>TAX</span>
                    <span>$0.00</span>
                  </p>
                  <p className={`${styles.textSecondary} ${styles.flexBetween}`}>
                    <span>TOTAL</span>
                    <span className={styles.totalPrice}>AUD {billOverviewInfo?.amount}</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className={styles.sideColumn}>
                <div>
                  <h4>Current Bill</h4>
                </div>
                <div className={styles.sideColumn__main}>
                  <p className={`${styles.currentPlan} ${styles.flexBetween}`}>
                    <span>Free Plan</span>
                    <span>$0.00</span>
                  </p>
                  <Link to="/price" className={styles.planBtn}>
                    <p>Start the trial today!</p>
                  </Link>
                </div>
                <div className={styles.sideColumn__footer}>
                  <p className={`${styles.textSecondary} ${styles.flexBetween}`}>
                    <span>TAX</span>
                    <span>$0.00</span>
                  </p>
                  <p className={`${styles.textSecondary} ${styles.flexBetween}`}>
                    <span>TOTAL</span>
                    <span className={styles.totalPrice}>AUD 0.00</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
