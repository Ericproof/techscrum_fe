import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginTabs.module.scss';

interface Props {
  show: boolean;
}

export default function loginTabs({ show }: Props) {
  return (
    <div
      className={`${styles.functionsLoginTabs} ${show ? styles.functionLoginTabsResponseShow : ''}`}
    >
      <a href="/#">Book a Demo</a>
      <Link to="/login">Login</Link>
      <Link className={styles.btn} to="/register">
        Try it to free
      </Link>
    </div>
  );
}
