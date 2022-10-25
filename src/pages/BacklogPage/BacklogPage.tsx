/* eslint-disable no-console */
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import BacklogSection from './BacklogSection/BacklogSection';
// import SprintSection from './SprintSection/SprintSection';
import styles from './BacklogPage.module.scss';
import { getBacklog } from '../../api/backlog/backlog';

export default function BacklogPage() {
  // WIP need to communicate with backend
  const [loaded, setLoaded] = useState(false);
  const [backlogData, setBacklogData] = useState(null);
  // const [sprintData, setSprintData] = useState(null);
  const { projectId = '' } = useParams();

  const getBacklogDataApi = useCallback(() => {
    const getBacklogData = async () => {
      try {
        const res = await getBacklog(projectId);
        setBacklogData(res.backlog);
        // setSprintData(res.sprints);
        setLoaded(true);
      } catch (e) {
        setLoaded(false);
      }
    };
    getBacklogData();
  }, [projectId]);

  useEffect(() => {
    getBacklogDataApi();
  }, [getBacklogDataApi]);

  return (
    <div className={styles.container}>
      <div>
        <h1>Backlog</h1>
      </div>
      <div className={styles.scrollContainer}>
        {/* <SprintSection sprintData={sprintData} render={render} /> */}
        <BacklogSection
          backlogData={backlogData}
          getBacklogDataApi={getBacklogDataApi}
          loaded={loaded}
        />
      </div>
    </div>
  );
}
