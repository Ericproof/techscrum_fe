import React from 'react';
import styles from './Home.module.scss';
import Header from '../../compoments/Header/Header';

export default function Home() {
  return (
    <>
      <Header />
      <h1 className={styles.header}>Static Routes</h1>
      <p>Home</p>
    </>
  );
}
