import React from 'react';
import Header from '../../components/Header/Header';
import PlanOption from './PlanOption/PlanOption';
import TrialHeading from './TrailHeading/TrailHeading';
import styles from './PricePage.module.scss';

function PricePage() {
  return (
    <div>
      <Header />
      <div className={styles.body}>
        <TrialHeading />
        <PlanOption />
      </div>
    </div>
  );
}

export default PricePage;
