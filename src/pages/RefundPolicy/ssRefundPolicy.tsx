import React from 'react';
import styles from './refundPolicy.module.scss';

export default function RefundPolicy() {
  return (
    <div className={styles.container}>
      <div className={styles.legalTitle}>
        <h1 className={styles.containerLegal}>legal</h1>

        <h1 className={styles.titleRefund}>Refund Policy</h1>
        <hr />
      </div>
      <div className={styles.refundContent}>
        <div className={styles.sidebar}>
          <ul className={styles.sideUl}>
            <li className={styles.sideLi}>
              <a href="https://www.techscrum.com/legal/">Our Legal Documents</a>
            </li>
            <li className={styles.sideLi}>
              <a href="https://www.techscrum.com/legal/cookie-policy/">Cookie Policy</a>
            </li>
            <li className={styles.sideLi}>
              <a href="https://www.techscrum.com/legal/gdpr/">GDPR compliance</a>
            </li>

            <li className={styles.sideLi}>
              <a href="https://www.techscrum.com/legal/privacy-policy/">Privacy Policy</a>
            </li>
            <li className={styles.sideLi}>
              <a href="https://www.techscrum.com/legal/privacy-statement/">Privacy Statement</a>
            </li>
            <li className={styles.sideLi}>
              <a href="https://www.techscrum.com/legal/refund-policy/">Refund Policy</a>
            </li>
            <li className={styles.sideLi}>
              <a href="https://www.techscrum.com/legal/terms-of-service/">Terms of Service</a>
            </li>
          </ul>
        </div>
        <div className={styles.refundText}>
          <p className={styles.refundText}>
            If you use the free version of TechScrum, you will never be charged. However, you can
            upgrade your account at any time
          </p>
          <p className={styles.refundText}>
            You can also select a 30-day trial version when you sign up for any of the paid accounts
            If you cancel within this 30-day trial, you will not be charged We do not ask for
            payment details to start a 30-day trial
          </p>

          <p className={styles.refundText}>
            When your 30-day free trial period expires, you will be asked to create a paid
            subscription on the Subscription page of your TechScrum installation to continue using
            the paid service You will be charged monthly approximately 30-days from the date you
            make the first payment
          </p>

          <p className={styles.refundText}>
            If you decide not to continue on the plan you picked for your 30-day trial, your account
            will automatically be downgraded to the free account which you can use forever without
            charge
          </p>

          <p className={styles.refundText}>
            To cancel your subscription on a paid plan, you must cancel your PayPal Subscription
            from within PayPal. Once your paypal account has been cancelled, your monthly payment
            will be cancelled You can cancel your account at any time simply by logging in, going to
            the Subscription page and clicking the ‘ Cancel my account ’link
          </p>

          <p className={styles.refundText}>
            If you opt to pay once a year in advance, there is no part refund if you decide to stop
            using your account during the year. Once you pay for a year upfront your account will be
            live for 12 months. After the 12 months you can either re-new for a whole year, pay
            month by month, or drop to a free account
          </p>
        </div>
      </div>
    </div>
  );
}
