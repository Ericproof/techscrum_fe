import React from 'react';
import ResetPasswordBackground from './ForgetPasswordVerifyBackground/ForgetPasswordVerifyBackground';
import styles from './ForgetPasswordVerifyPage.module.scss';
import ResetPasswordMain from './ForgetPasswordVerifyMain/ForgetPasswordVerifyMain';

export default function RegistePager() {
  return (
    <div className={styles.registerContainer}>
      <ResetPasswordBackground>
        <ResetPasswordMain />
      </ResetPasswordBackground>
    </div>
  );
}
