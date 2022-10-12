import React, { useEffect, useState } from 'react';
import { getBacklogData } from '../../api/backlog/backlog';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import BacklogSection from './BacklogSection/BacklogSection';
import SprintSection from './SprintSection/SprintSection';

export default function BacklogPage() {
  // WIP fetch data from backend and pass down
  const [backlogData, setBacklogData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    getBacklogData().then((response) => {
      setBacklogData(response);
      setIsLoaded(true);
    });
  }, []);
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(backlogData);
  }, [backlogData]);

  return (
    <DashboardLayout>
      <div>
        <h1>Backlog</h1>
      </div>
      {isLoaded && (
        <>
          <SprintSection />
          <BacklogSection />
        </>
      )}
    </DashboardLayout>
  );
}
