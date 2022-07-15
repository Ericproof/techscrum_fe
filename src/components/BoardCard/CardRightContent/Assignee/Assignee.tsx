import React from 'react';
import styles from './Assignee.module.scss';

export default function Assignee() {
  return (
    <div className={styles.assignee}>
      <div>Assignee</div>
      <div>
        <span className={styles.icon} />
        <div className={styles.roleName}>Evan Lin</div>
      </div>
    </div>
  );
}
