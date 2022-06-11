import React from 'react';
import styles from './LoginTabs.module.scss';

interface Props {
  show: boolean;
}

export default function loginTabs({ show }: Props) {
  return (
    <div
      className={`${styles.functionsLoginTabs} ${show ? styles.functionLoginTabsResponseShow : ''}`}
    >
      <a href="/#">Book a Demo</a>
      <a href="/#">Login</a>
      <a className={styles.btn} href="/#">
        Try it to free
      </a>
    </div>
  );
}
