import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import BoardSection from './BoardSection/BoardSection';
import CustomerSection from './CustomerSection/CustomerSection';
import FeatureSection from './FeatureSection/FeatureSection';
import GetStartSection from './GetStartSection/GetStartSection';
import PlatformSection from './PlatformSection/PlatformSection';
import styles from './ReportPage.module.scss';

function ReportPage() {
  return (
    <>
      <Header />
      <div className={styles.mainWrapper}>
        <GetStartSection />
        <BoardSection />
        <FeatureSection />
        <PlatformSection />
        <CustomerSection />
      </div>
      <Footer />
    </>
  );
}

export default ReportPage;
