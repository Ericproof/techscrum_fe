import React from 'react';
import styles from './Top.module.scss';

export default function SecurityPage() {
  return (
    <div className={styles.securitytopContainer}>
      <h1>Security at Teamwork</h1>
      <p>
        We’re privileged to be trusted by thousands of companies in over 140 countries worldwide.
      </p>
      <svg className={styles.blueRecContainer}>
        <rect className={styles.blueRec} />
      </svg>
      <svg className={styles.yellowRecContainer}>
        <rect className={styles.yellowRec} />
      </svg>
      <svg className={styles.pinkCirContainer}>
        <circle className={styles.pinkCir} />
      </svg>
    </div>
  );
}
