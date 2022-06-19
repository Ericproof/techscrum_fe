import React from 'react';
import styles from './ChangeKey.module.scss';

export default function ChangeKey() {
  return (
    <div className={styles.keyInputSection}>
      <label htmlFor="key">
        <span>Key</span>
        <input type="text" id="key" name="Key" />
      </label>
    </div>
  );
}
