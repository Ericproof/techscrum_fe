import React from 'react';
import styles from './Register.module.scss';
import RegisterBackground from './RegisterBackground/RegisterBackground';
import RegisterMain from './RegisterMain/RegisterMain';
import RegisterFooter from './RegisterFooter/RegisterFooter';

export default function Register() {
  return (
    <div className={styles.registerContainer}>
      <RegisterBackground />
      <RegisterMain />
      <div className={styles.space} />
      <RegisterFooter />
    </div>
  );
}
