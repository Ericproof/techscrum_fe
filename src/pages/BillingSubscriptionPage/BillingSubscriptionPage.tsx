import React from 'react';
import MainMenuV2 from '../MainMenuV2/MainMenuV2';
import SubSettingMenu from '../../lib/SubSettingMenu/SubSettingMenu';
import styles from './BillingSubscriptionPage.module.scss';
import logo from '../../assets/small-logo.svg';

const user = 'free';

export default function BillingSubscriptionPage() {
  return (
    <div className={styles.pageContainer}>
      <MainMenuV2 />
      <SubSettingMenu />
      <div className={styles.sectionContainer}>
        <h2>Manage subscriptions {user}</h2>
        <div className={styles.rowLayout}>
          <div className={styles.mainColumn}>
            <div>
              <h4>We need your payment details</h4>
              <p>
                Your free trials end soon. Add your payment details to keep enjoying the benefits of
                your Techscrum product.
              </p>
              <a href="/billing/paymentdetails/add">Add payment details</a>
            </div>
            <div>
              <h4>ACTIVE SUBSCRIPTIONS</h4>
              <div className={`${styles.planContainer} ${styles.cardBox}`}>
                <h3>
                  <img src={logo} alt="logo" className={styles.logoIcon} />
                  <span>TechScrum Access</span>
                </h3>
                <div>
                  <p>Price estimate</p>
                  <p>Free until Apr 15</p>
                </div>
                <div>
                  <a href="/price">Start the trial</a>
                  <div>
                    <button>...</button>
                    <ul>
                      <li>
                        <button>Unsubscribe</button>
                      </li>
                      <li>
                        <a href="/support-center">Get support</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.sideColumn}>
            <div className={`${styles.flexCol} ${styles.cardBox}`}>
              <h4>Payment options</h4>
              <p>
                Start monthly subscription <a href="/billing/paymentdetails">Add billing details</a>
              </p>
              <p>
                See pricing and pay for your site <a href="/price">Choose annual payment</a>
              </p>
            </div>

            <div className={styles.cardBox}>
              <h4>Current Bill</h4>
              <p className={`${styles.currentPlan} ${styles.flexBetween}`}>
                <span>Free Plan</span>
                <span>$0.00</span>
              </p>

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
    </div>
  );
}
