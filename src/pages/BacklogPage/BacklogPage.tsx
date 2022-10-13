import React from 'react';
import BacklogSection from './BacklogSection/BacklogSection';
import SprintSection from './SprintSection/SprintSection';
import styles from './BacklogPage.module.scss';

export default function BacklogPage() {
  // WIP fetch data from backend and pass donw

  return (
    <div className={styles.container}>
      <div>
        <h1>Backlog</h1>
      </div>
      <div className={styles.scrollContainer}>
        <SprintSection />
        <BacklogSection />
      </div>
    </div>
  );
}
