import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config/config';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import BacklogSection from './BacklogSection/BacklogSection';
import SprintSection from './SprintSection/SprintSection';

export default function BacklogPage() {
  // WIP fetch data from backend and pass down
  const [backlogData, setBacklogData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const path = 'http://localhost:8000/api/v1/backlog';
    const getData = async () => {
      const response = await axios.get(path);
      setIsLoaded(true);
      setBacklogData(response);
    };
    getData();
  }, []);
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(backlogData);
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
