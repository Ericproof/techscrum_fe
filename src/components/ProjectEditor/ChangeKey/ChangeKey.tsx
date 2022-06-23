import React from 'react';
import styles from './ChangeKey.module.scss';

export default function ChangeKey(props: any) {
  const { value, onChange } = props;
  return (
    <div className={styles.keyInputSection}>
      <label htmlFor="key">
        <span>Key</span>
        <input type="text" id="key" name="key" onChange={onChange} value={value} />
      </label>
    </div>
  );
}
