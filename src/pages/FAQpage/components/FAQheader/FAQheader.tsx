import React from 'react';
import styles from './FAQheader.module.scss';

export default function FAQheader() {
  return (
    <header className={styles.FAQheader}>
      <h1>How can we help you today?</h1>
      <input type="text" placeholder="Search" />
    </header>
  );
}
