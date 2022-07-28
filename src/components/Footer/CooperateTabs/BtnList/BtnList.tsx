import React from 'react';
import styles from './BtnList.module.scss';

export default function BtnList() {
  return (
    <div className={styles.buttonList}>
      <a className={styles.white} href="/#">
        Try TechScrum for Free
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
