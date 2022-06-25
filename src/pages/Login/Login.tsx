import React from 'react';
import styles from './Login.module.scss';
import LoginBackground from './LoginBackground/LoginBackground';
import LoginMain from './LoginMain/LoginMain';
import LoginFooter from './LoginFooter/LoginFooter';

export default function Login() {
  return (
    <div className={styles.registerContainer}>
      <LoginBackground />
      <LoginMain />
      <LoginFooter />
    </div>
  );
}
