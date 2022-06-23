import React from 'react';
import styles from './ChangeName.module.scss';

export default function ChangeName(props: any) {
  const { value, onChange } = props;
  return (
    <div className={styles.nameInputSection}>
      <label htmlFor="name">
        <span>Name</span>
        <input type="text" id="name" name="name" value={value} onChange={onChange} />
      </label>
    </div>
  );
}
