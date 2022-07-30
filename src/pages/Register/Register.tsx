import React from 'react';
import VerifyPageBackground from '../VerifyPage/VerifyPageBackground/VerifyPageBackground';
import styles from './Register.module.scss';
import RegisterMain from './RegisterMain/RegisterMain';

export default function Register() {
  return (
    <div className={styles.registerContainer}>
      <VerifyPageBackground>
        <RegisterMain />
      </VerifyPageBackground>
    </div>
  );
}
