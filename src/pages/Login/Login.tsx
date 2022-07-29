import React from 'react';
import VerifyPageBackground from '../VerifyPage/VerifyPageBackground/VerifyPageBackground';
import styles from './Login.module.scss';
import LoginBackground from './LoginBackground/LoginBackground';
import LoginMain from './LoginMain/LoginMain';

export default function Login() {
  return (
    <div className={styles.registerContainer}>
      <VerifyPageBackground>
        <LoginMain />
      </VerifyPageBackground>
    </div>
  );
}
