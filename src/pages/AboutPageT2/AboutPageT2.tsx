import React from 'react';
import Banner from './components/Banner/Banner';
import styles from './AboutPageT2.module.scss';
import CardsOfValues from './components/OurValuesCards/CardsOfValues';
import AboutCareer from './components/AboutCareer/AboutCareer';
import GetStarted from './components/GetStarted/GetStarted';

export default function AboutPageT2() {
  return (
    <div className={styles.container}>
      <div className={styles.greeting}>
        <Banner />
      </div>

      <div className="introduction-clip">
        <img
          src="https://embed-ssl.wistia.com/deliveries/c3648fe3ea850ffce14b1b3d78c6a517.webp?image_crop_resized=1920x1080"
          alt="intro"
          className={styles.introImg}
        />
      </div>

      <div>
        <CardsOfValues />
      </div>

      <div>
        <AboutCareer />
      </div>

      <div className="background-white">
        <GetStarted />
      </div>
    </div>
  );
}
