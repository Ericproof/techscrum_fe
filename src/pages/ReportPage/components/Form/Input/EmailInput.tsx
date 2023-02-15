import React from 'react';
import PrimaryButton from '../../Button/PrimaryButton/PrimaryButton';
import styles from './EmailInput.module.scss';

function EmailInput() {
  return (
    <div className={styles.emailInput}>
      <input type="email" placeholder="Enter your work email" />
      <PrimaryButton btnTitle="get started" fullWidth />
    </div>
  );
}

export default EmailInput;
