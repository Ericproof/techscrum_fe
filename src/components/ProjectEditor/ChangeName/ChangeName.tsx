import React from 'react';
import styles from './ChangeName.module.scss';

export default function ChangeName() {
  return (
    <div className={styles.nameInputSection}>
      <label htmlFor="Name">
        <span>Name</span>
        <input type="text" id="Name" name="Name" />
      </label>
    </div>
  );
}
