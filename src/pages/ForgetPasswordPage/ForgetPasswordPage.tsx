import React from 'react';
import ForgetPasswordBackground from './ForgetPasswordBackground/ForgetPasswordBackground';
import styles from './ForgetPasswordPage.module.scss';
import ForgetPasswordMain from './ForgetPasswordMain/ForgetPasswordMain';

export default function ForgetPasswordPager() {
  return (
    <div className={styles.forgetPasswordContainer}>
      <ForgetPasswordBackground>
        <ForgetPasswordMain />
      </ForgetPasswordBackground>
    </div>
  );
}
