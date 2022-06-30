import React from 'react';
import styles from './Login.module.scss';
import LoginBackground from './LoginBackground/LoginBackground';
import LoginMain from './LoginMain/LoginMain';

export default function Login() {
  return (
    <div className={styles.registerContainer}>
      <LoginBackground />
      <LoginMain />
    </div>
  );
}
