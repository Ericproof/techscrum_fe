import React from 'react';
import VerifyPageBackground from '../VerifyPage/VerifyPageBackground/VerifyPageBackground';
import styles from './LoginPage.module.scss';
import LoginMain from './LoginMain/LoginMain';
import Deprecated from '../../components/DEPRECATED/Deprecated';

export default function LoginPage() {
  return (
    <Deprecated>
      <div className={styles.registerContainer}>
        <VerifyPageBackground>
          <LoginMain />
        </VerifyPageBackground>
      </div>
    </Deprecated>
  );
}
