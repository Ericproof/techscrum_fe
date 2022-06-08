import React from 'react';
import styles from './index.module.scss';

export default function btnList() {
  return (
    <div className={styles.buttonList}>
      <a className={styles.white} href="/#">
        Try Teamwork for Free
      </a>
      <a className={styles.black} href="/#">
        Join a webinar
      </a>
      <a className={styles.black} href="/#">
        Get in touch
      </a>
    </div>
  );
}
