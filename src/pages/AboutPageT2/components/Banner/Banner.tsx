import React from 'react';
import styles from './Banner.module.scss';

export default function Banner() {
  return (
    <section className={styles.container}>
      <h1 className={styles.header}>Hello! We are Teamwork</h1>
      <p className={styles.text}>
        Our mission is to make teams that deliver client work <strong>efficient, organized,</strong>{' '}
        profitable and <strong>happy.</strong>
      </p>
      <hr className={styles.line} />
    </section>
  );
}
