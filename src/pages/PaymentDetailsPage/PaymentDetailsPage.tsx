import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiUser } from 'react-icons/hi';
import MainMenuV2 from '../MainMenuV2/MainMenuV2';
import SubSettingMenu from '../../lib/SubSettingMenu/SubSettingMenu';
import styles from './PaymentDetailsPage.module.scss';
import mention from '../../assets/creditCards.svg';
import InvoiceForm from './InvoiceForm/InvoiceForm';
import CreditCardForm from './CreditCardForm/CreditCardForm';

interface IUserPayment {
  plan: string;
  admin: {
    name: string;
    email: string;
  };
  invoiceEmail: string;
  onTrial: boolean;
}

const freeUser = {
  plan: 'free',
  admin: {
    name: 'Hyna',
    email: 'Hyna@example.com'
  },
  invoiceEmail: 'Hyna@example.com',
  onTrial: true
};

const advanceUser = {
  plan: 'advanced',
  admin: {
    name: 'Hyna',
    email: 'Hyna@example.com'
  },
  invoiceEmail: 'Hyna@example.com',
  onTrial: true
};

export default function PaymentDetailsPage() {
  const [user, setUser] = useState<IUserPayment>(freeUser);
  const [invoiceEmail, setInvoiceEmail] = useState<string>(freeUser.invoiceEmail);
  const [isFreePlan, setIsFreePlan] = useState<boolean>(true);
  const { onTrial } = user;

  useEffect(() => {
    if (user.plan === 'free') {
      setIsFreePlan(true);
    } else {
      setIsFreePlan(false);
    }
  }, [user]);

  return (
    <div className={styles.pageContainer}>
      <MainMenuV2 />
      <SubSettingMenu />
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>Billing details</h2>
        <div className={styles.flexRow}>
          <div className={styles.mainColumn}>
            {isFreePlan ? (
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
                  <p>Admin name</p>
                  <p className={styles.textSecondary}>Admin email address</p>
                </div>
              </div>
            </div>
            <InvoiceForm invoiceEmail={invoiceEmail} setInvoiceEmail={setInvoiceEmail} />
            <p className={styles.textSecondary}>
              Your credit card issuer may charge foreign transaction or cross-border fees in
              addition to the total price above.
            </p>
            <div>
              <button className={styles.setUserBtn} onClick={() => setUser(freeUser)}>
                Free
              </button>
              <button className={styles.setUserBtn} onClick={() => setUser(advanceUser)}>
                Adavance
              </button>
            </div>
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
              {isFreePlan ? (
                <Link to="/price" className={styles.planBtn}>
                  <p>Start the trial today!</p>
                </Link>
              ) : (
                onTrial && <p className={`${styles.planBtn} ${styles.trialBtn}`}>FREE TRIAL</p>
              )}
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
