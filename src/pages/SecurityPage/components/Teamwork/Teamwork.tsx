import React from 'react';
import styles from './Teamwork.module.scss';

export default function Teamwork() {
  return (
    <div className={styles.teamworkContainer}>
      <div className={styles.background} />
      <div className={styles.DescButtonContainer}>
        <div className={styles.desc}>
          <h3>Get started with Teamwork</h3>
          <p>
            Start working together beautifully. See how Teamwork can help your team with our 30-day
            free trial.
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.whiteBackground}>Try Teamwork for free</button>
          <button>Join a webinar</button>
          <button>Get in touch</button>
        </div>
      </div>
    </div>
  );
}
