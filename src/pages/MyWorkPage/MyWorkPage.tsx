import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './MyWorkPage.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ReusableSection from './ReusableSection/ReusableSection';
import HomeSection from './HomeSection/HomeSection';
import REUSABLE_SECTION_TEXT from './constant';

export default function MyWorkPage() {
 
  return (
    <div className={styles.myWorkPage}>
      <Header />
      <HomeSection />
      {}
      {REUSABLE_SECTION_TEXT.map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <ReusableSection
            key={uuidv4()}
            isImageRight={isEven}
            subtitle={item.subtitle}
            heading={item.heading}
            text={item.text}
          />
        );
      })}
      <Footer />
    </div>
  );
}
