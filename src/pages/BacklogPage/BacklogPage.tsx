import React, { useEffect, useState } from 'react';
import { getBacklogData } from '../../api/backlog/backlog';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import BacklogSection from './BacklogSection/BacklogSection';
import SprintSection from './SprintSection/SprintSection';
import styles from './BacklogPage.module.scss';

export default function BacklogPage() {
  // WIP need to communicate with backend

  const [backlogData, setBacklogData] = useState(null);
  useEffect(() => {
    getBacklogData().then((response) => {
      setBacklogData(response);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <h1>Backlog</h1>
      </div>
      {backlogData && (
        <>
          <SprintSection />
          <BacklogSection />
        </>
      )}
    </DashboardLayout>
  );
}
