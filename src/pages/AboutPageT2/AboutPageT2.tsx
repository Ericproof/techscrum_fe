import React from 'react';
import styles from './AboutPageT2.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function AboutPageT2() {
  return (
    <>
      <Header />
      <section className={styles.container}>
        <h1 className={styles.header}>People who make it happen</h1>
        <hr className={styles.line} />
      </section>
      <Footer />
    </>
  );
}
