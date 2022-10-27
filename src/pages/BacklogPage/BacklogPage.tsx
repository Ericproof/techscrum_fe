import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import BacklogSection from './BacklogSection/BacklogSection';
import styles from './BacklogPage.module.scss';
import { getBacklog } from '../../api/backlog/backlog';

export default function BacklogPage() {
  // WIP need to communicate with backend
  const [loaded, setLoaded] = useState(false);
  const [backlogData, setBacklogData] = useState(null);
  const { projectId = '' } = useParams();

  const getBacklogDataApi = useCallback(() => {
    const getBacklogData = async () => {
      try {
        const res = await getBacklog(projectId);
        setBacklogData(res.backlog);
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
        <BacklogSection
          backlogData={backlogData}
          getBacklogDataApi={getBacklogDataApi}
          loaded={loaded}
        />
      </div>
    </div>
  );
}
