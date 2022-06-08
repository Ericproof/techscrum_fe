import React from 'react';
import styles from './LoginTabs.module.scss';

export default function loginTabs() {
  return (
    <div className={styles.functionsLoginTabs}>
      <a href="/#">Book a Demo</a>
      <a href="/#">Login</a>
      <a className={styles.btn} href="/#">
        Try it to free
      </a>
    </div>
  );
}
