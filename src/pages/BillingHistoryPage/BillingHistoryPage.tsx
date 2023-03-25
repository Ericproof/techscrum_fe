import React from 'react';
import MainMenuV2 from '../MainMenuV2/MainMenuV2';
import SubSettingMenu from '../../lib/SubSettingMenu/SubSettingMenu';
import styles from './BillingHistoryPage.module.scss';
import folder from '../../assets/billingFolder.svg';

export default function BillingHistoryPage() {
  return (
    <div className={styles.pageContainer}>
      <MainMenuV2 />
      <SubSettingMenu />
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>Billing history</h2>
        <img src={folder} alt="folder" />
      </div>
    </div>
  );
}
