import React, { useEffect, useState } from 'react';
import { getBacklogData } from '../../api/backlog/backlog';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import BacklogSection from './BacklogSection/BacklogSection';
import SprintSection from './SprintSection/SprintSection';

export default function BacklogPage() {
  // WIP need to communicate with backend

  const [backlogData, setBacklogData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    getBacklogData().then((response) => {
      setBacklogData(response);
      setIsLoaded(true);
    });
  }, []);

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
