import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginTabs.module.scss';

export default function LoginTabs() {
  return (
    <div className={styles.functionsLoginTabs}>
      <a href="/#">Book a Demo</a>
      <Link to="/login">Login</Link>
      <Link className={styles.btn} to="/register">
        Try it to free
      </Link>
    </div>
  );
}
