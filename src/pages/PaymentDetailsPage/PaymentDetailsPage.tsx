import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiUser } from 'react-icons/hi';
import MainMenuV2 from '../MainMenuV2/MainMenuV2';
import SubSettingMenu from '../../lib/SubSettingMenu/SubSettingMenu';
import styles from './PaymentDetailsPage.module.scss';
import mention from '../../assets/creditCards.svg';
import Input from './Input/Input';

interface IUserPayment {
  plan: string;
}
const userPayment = {
  plan: 'Free'
};

export default function PaymentDetailsPage() {
  const [user, setUser] = useState<IUserPayment>(userPayment);

  useEffect(() => {
    setUser(userPayment);
  }, []);

  return (
    <div className={styles.pageContainer}>
      <MainMenuV2 />
      <SubSettingMenu />
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>Billing details</h2>
        <div className={styles.flexRow}>
          <div className={styles.mainColumn}>
            <div className={styles.creditCards__container}>
              <img src={mention} alt="mention" className={styles.creditCards} />
              <button className={styles.pageBtn}>Add payment method</button>
              <p className={styles.textSecondary}>We accept all major credit/debit cards</p>
            </div>
            <h3>Contact details</h3>
            <div>
              <h4 className={styles.billingContactTitle}>
                <span>Billing contact</span>
                <span className={styles.infoIcon}>i</span>
              </h4>
              <div className={styles.flexAlign}>
                <HiUser className={styles.userIcon} color="white" fontSize="2.5rem" />
                <div>
                  <p>Admin name</p>
                  <p className={styles.textSecondary}>Admin email address</p>
                </div>
              </div>
            </div>
            <form className={styles.invoice__form}>
              <div className={styles.flexCol}>
                <span className={styles.textSecondary}>Send copies of invoices to</span>
                <Input />
              </div>
              <button className={`${styles.pageBtn} ${styles.invoice__Btn}`}>Save</button>
            </form>
            <p className={styles.textSecondary}>
              Your credit card issuer may charge foreign transaction or cross-border fees in
              addition to the total price above.
            </p>
          </div>
          <div className={styles.sideColumn}>
            <div>
              <h4>Current Bill</h4>
              <p className={styles.textSecondary}>Apr 15, 2023 - May 15, 2023</p>
            </div>
            <div className={styles.sideColumn__main}>
              <p className={`${styles.currentPlan} ${styles.flexBetween}`}>
                <span>{user.plan} Plan</span>
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
        </div>
      </div>
    </div>
  );
}
