import React from 'react';
import styles from './Reporter.module.scss';

export default function Reporter() {
  return (
    <div className={styles.reporter}>
      <div>Reporter</div>
      <div>
        <span className={styles.icon} />
        <div className={styles.roleName}>Evan Lin</div>
      </div>
    </div>
  );
}
