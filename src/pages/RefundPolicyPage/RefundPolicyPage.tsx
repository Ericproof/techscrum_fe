import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './RefundPolicyPage.module.scss';

export default function RefundPolicyPage() {
  return (
    <div className={styles.refundMain}>
      <div className={styles.refundContainer}>
        <div className={styles.refundTextCenter}>
          <p>legal</p>
          <h1>Refund Policy</h1>
          <hr />
        </div>
        <div className={styles.refundRow}>
          <div className={styles.sidebar}>
            <ul className={styles.stickySidebar}>
              <li id={styles.RemoveBorder}>
                <Link to="/" style={{ padding: '0 0 7px 0' }}>
                  Our Legal Documents
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/gdpr">GDPR compliance</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/privacy-statement">Privacy Statement</Link>
              </li>
              <li>
                <Link to="/refund-policy">Refund Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-service">Terms Of Service</Link>
              </li>
            </ul>
            <Outlet />
          </div>
          <div className={styles.refundText}>
            <p>
              If you use the free version of TechScrum, you will never be charged. However, you can
              upgrade your account at any time
            </p>
            <p>
              You can also select a 30-day trial version when you sign up for any of the paid
              accounts If you cancel within this 30-day trial, you will not be charged We do not ask
              for payment details to start a 30-day trial
            </p>

            <p>
              When your 30-day free trial period expires, you will be asked to create a paid
              subscription on the Subscription page of your TechScrum installation to continue using
              the paid service You will be charged monthly approximately 30-days from the date you
              make the first payment
            </p>

            <p>
              If you decide not to continue on the plan you picked for your 30-day trial, your
              account will automatically be downgraded to the free account which you can use forever
              without charge
            </p>

            <p>
              To cancel your subscription on a paid plan, you must cancel your PayPal Subscription
              from within PayPal. Once your paypal account has been cancelled, your monthly payment
              will be cancelled You can cancel your account at any time simply by logging in, going
              to the Subscription page and clicking the ‘ Cancel my account ’link
            </p>

            <p>
              If you opt to pay once a year in advance, there is no part refund if you decide to
              stop using your account during the year. Once you pay for a year upfront your account
              will be live for 12 months. After the 12 months you can either re-new for a whole
              year, pay month by month, or drop to a free account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
