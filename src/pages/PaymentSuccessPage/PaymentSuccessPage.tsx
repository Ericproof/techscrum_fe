import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PaymentSuccessPage.module.scss';
import paymentSuccess from '../../assets/payment-success.webp';

const user = {
  name: 'Hyna',
  period: '14',
  plan: 'Advanced Plan',
  startDate: 1673159738
};

const formatTimeStamp = (stamp: number): string => {
  const date = new Date(stamp * 1000);
  const formattedDate = date.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  return formattedDate;
};

export default function PaymentSuccessPage() {
  return (
    <div className={styles.sectionContainer}>
      <h2>Payment Success</h2>
      <img src={paymentSuccess} alt="paymentSuccess" className={styles.paymentImg} />
      <div className={styles.contents}>
        <p className={styles.textSecondary}>Hi, admin {user.name}</p>
        <p>
          Welcome to your {user.period} days free trial of {user.plan} subscription! The payment
          method you provided will be charged monthly/yearly starting{' '}
          {formatTimeStamp(user.startDate)}.
        </p>
        <p>
          As a member, you can explore, manage, and cancel your subscription at any time by visiting
          plan & billing settings.
        </p>
        <p>Welcome aboard!</p>
        <p className={styles.textSecondary}>The TechScrum Team</p>
      </div>
      <Link className={styles.linkBtn} to="/projects">
        Go Projects
      </Link>
    </div>
  );
}
