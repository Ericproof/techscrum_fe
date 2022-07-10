import React from 'react';
import styles from './Loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.bounce}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
