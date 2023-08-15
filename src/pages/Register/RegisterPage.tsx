import React from 'react';
import VerifyPageBackground from '../VerifyPage/VerifyPageBackground/VerifyPageBackground';
import styles from './RegisterPage.module.scss';
import RegisterMain from './RegisterMain/RegisterMain';
import Deprecated from '../../components/DEPRECATED/Deprecated';

export default function RegistePager() {
  return (
    <Deprecated>
      <div className={styles.registerContainer}>
        <VerifyPageBackground>
          <RegisterMain />
        </VerifyPageBackground>
      </div>
    </Deprecated>
  );
}
