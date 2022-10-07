import React from 'react';
import Greeting from './components/Banner/Banner';
import styles from './AboutPageT2.module.scss';
import CardsOfValues from './components/OurValuesCards/CardsOfValues';
import AboutCareer from './components/AboutCareer/AboutCareer';
import GetStarted from './components/GetStarted/GetStarted';

export default function AboutPageT2() {
  return (
    <div className={styles.container}>
      <div className="greeting">
        <Greeting />
      </div>

      <div className="introduction-clip">
        <p>introduction-clip</p>
      </div>

      <div>
        <CardsOfValues />
      </div>

      <div>
        <AboutCareer />
      </div>

      <div>
        <GetStarted />
      </div>
    </div>
  );
}
