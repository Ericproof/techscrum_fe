import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import PlanOption from './PlanOption/PlanOption';
import TrialHeading from './TrailHeading/TrailHeading';
import styles from './PricePage.module.scss';

function PricePage() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <Header />
      <div className={styles.body}>
        <TrialHeading isChecked={isChecked} setIsChecked={setIsChecked} />
        <PlanOption isChecked={isChecked} setIsChecked={setIsChecked} />
      </div>
    </div>
  );
}

export default PricePage;
