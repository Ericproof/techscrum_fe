import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import GetStartSection from './GetStartSection/GetStartSection';
import styles from './ReportPage.module.scss';

function ReportPage() {
  return (
    <>
      <Header />
      <div className={styles.mainWrapper}>
        <GetStartSection />
      </div>
      <Footer />
    </>
  );
}

export default ReportPage;
