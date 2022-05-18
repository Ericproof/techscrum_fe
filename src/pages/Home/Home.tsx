import React from 'react';
import styles from './Home.module.scss';
import Footer from '../../compoments/Footer';

export default function Home() {
  return (
    <>
      <h1 className={styles.header}>Static Routes</h1>
      <p>Home</p>
    </>
  );
}
