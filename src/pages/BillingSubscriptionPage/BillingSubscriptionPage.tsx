import React, { useState } from 'react';
import { IoWarning } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import MainMenuV2 from '../MainMenuV2/MainMenuV2';
import SubSettingMenu from '../../lib/SubSettingMenu/SubSettingMenu';
import styles from './BillingSubscriptionPage.module.scss';
import logo from '../../assets/small-logo.svg';
import useOutsideAlerter from '../../hooks/OutsideAlerter';
import PopUpModal from './PopUpModal';

const userFree = {
  plan: 'free',
  endDate: 1681273318
};

const userAdvanced = {
  plan: 'advance',
  endDate: 1681273318
};

export default function BillingSubscriptionPage() {
  const [user, setUser] = useState(userFree);
  const [modal, setModal] = useState(false);

  const { visible, setVisible, myRef } = useOutsideAlerter(false);

  const showOptions = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <MainMenuV2 />
        <SubSettingMenu />
        <div className={styles.sectionContainer}>
          <h2>Manage subscriptions</h2>
          <div className={styles.rowLayout}>
            <div className={styles.mainColumn}>
              <div className={styles.warnBox}>
                <div>
                  <IoWarning color="orange" fontSize="1.5rem" />
                </div>
                <div className={styles.flexCol}>
                  <h4>We need your payment details</h4>
                  <p className={styles.textSecondary}>
                    Your free trials end soon. Add your payment details to keep enjoying the
                    benefits of your Techscrum product.
                  </p>
                  <Link className={styles.links} to="/billing/paymentdetails/add">
                    Add payment details
                  </Link>
                </div>
              </div>
              <div className={styles.subscriptionsBox}>
                <p className={styles.subscriptionsBoxTitle}>
                  <b>ACTIVE SUBSCRIPTIONS</b>
                </p>
                <div className={`${styles.planBox} ${styles.cardBox}`}>
                  <h3 className={styles.planTitle}>
                    <img src={logo} alt="logo" className={styles.logoIcon} />
                    <span>TechScrum Access</span>
                    {user.plan === 'advance' && <span className={styles.label}>FREE TRIAL</span>}
                  </h3>
                  <div className={styles.planEndDate}>
                    <p className={styles.textSecondary}>Price estimate</p>
                    <p>Free until Apr 15</p>
                  </div>
                  <div className={styles.planFooter}>
                    <Link className={styles.trialBtn} to="/price">
                      {user.plan === 'advance' ? 'Change plan' : 'Start the trial'}
                    </Link>
                    <div className={styles.planOptionsBtn} ref={myRef}>
                      <button className={styles.dotsBtn} onClick={showOptions}>
                        ...
                      </button>
                      <ul
                        className={
                          visible ? `${styles.planOptions} ${styles.active}` : styles.planOptions
                        }
                      >
                        {user.plan === 'advance' && (
                          <li>
                            <button className={styles.optionBtn} onClick={() => setModal(true)}>
                              Unsubscribe
                            </button>
                          </li>
                        )}

                        <li>
                          <Link className={styles.optionBtn} to="/support-center">
                            Get support
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button onClick={() => setUser(userFree)}>Free</button>
                <button onClick={() => setUser(userAdvanced)}>Adavance</button>
              </div>
            </div>
            <div className={styles.sideColumn}>
              <div className={`${styles.cardBox} ${styles.flexCol}`}>
                <h4>Payment options</h4>
                <p>
                  Start monthly subscription{' '}
                  <Link to="/billing/paymentdetails" className={styles.links}>
                    Add billing details
                  </Link>
                </p>
                <p>
                  See pricing and pay for your site{' '}
                  <Link to="/price" className={styles.links}>
                    Choose annual payment
                  </Link>
                </p>
              </div>

              <div className={`${styles.cardBox} ${styles.flexCol}`}>
                <div>
                  <h4>Current Bill</h4>
                  <p className={styles.textSecondary}>Apr 15, 2023 - May 15, 2023</p>
                </div>
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
      {modal && <PopUpModal user={user} setModal={setModal} />}
    </>
  );
}
