import React from 'react';
import styles from './Description.module.scss';

export default function Description() {
  return (
    <div className={styles.content}>
      <h1>Get Started with Teamwork</h1>
      <p>
        <span>
          Start working together beautifully. See how Teamwork can help your team with our 30-day
          free trial.
        </span>
      </p>
    </div>
  );
}
