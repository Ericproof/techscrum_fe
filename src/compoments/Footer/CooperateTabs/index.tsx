import React from 'react';
import styles from './index.module.scss';
import Background from './Background';
import Description from './Description';
import BtnList from './BtnList';

export default function cooperateTabs() {
  return (
    <div className={styles.teamworkLabel}>
      <Background />
      <Description />
      <BtnList />
    </div>
  );
}
