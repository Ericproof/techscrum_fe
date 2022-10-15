import React, { useEffect, useState } from 'react';
import { getBacklogData } from '../../api/backlog/backlog';
import BacklogSection from './BacklogSection/BacklogSection';
import SprintSection from './SprintSection/SprintSection';
import styles from './BacklogPage.module.scss';

export default function BacklogPage() {
  // WIP need to communicate with backend

  const [backlogData, setBacklogData] = useState(true);
  // useEffect(() => {
  //   getBacklogData().then((response) => {
  //     setBacklogData(response);
  //   });
  // }, []);

  return (
    <div className={styles.container}>
      <div>
        <h1>Backlog</h1>
      </div>
      {backlogData && (
        <div className={styles.scrollContainer}>
          <SprintSection />
          <BacklogSection />
        </div>
      )}
    </div>
  );
}
