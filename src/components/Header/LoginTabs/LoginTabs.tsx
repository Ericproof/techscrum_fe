import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginTabs.module.scss';

interface Props {
  show: boolean;
}

export default function loginTabs({ show }: Props) {
  return (
    <div className={`${styles.functionsLoginTabs} ${show ? styles.functionLoginTabsActive : ''}`}>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}
