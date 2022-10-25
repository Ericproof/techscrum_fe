/* eslint-disable no-console */
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import BacklogSection from './BacklogSection/BacklogSection';
// import SprintSection from './SprintSection/SprintSection';
import styles from './BacklogPage.module.scss';
import { getBacklogData } from '../../api/backlog/backlog';

export default function BacklogPage() {
  // WIP need to communicate with backend
  const [loaded, setLoaded] = useState(false);
  const [backlogData, setBacklogData] = useState(null);
  // const [sprintData, setSprintData] = useState(null);
  const { projectId = '' } = useParams();

  const render = useCallback(() => {
    const getBacklog = async () => {
      try {
        const res = await getBacklogData(projectId);
        setBacklogData(res.backlog);
        // setSprintData(res.sprints);
        setLoaded(true);
      } catch (e) {
        setLoaded(false);
      }
    };
    getBacklog();
  }, [projectId]);

  useEffect(() => {
    render();
  }, [render]);

  return (
    <div className={styles.container}>
      <div>
        <h1>Backlog</h1>
      </div>
      <div className={styles.scrollContainer}>
        {/* <SprintSection sprintData={sprintData} render={render} /> */}
        <BacklogSection backlogData={backlogData} render={render} loaded={loaded} />
      </div>
    </div>
  );
}
