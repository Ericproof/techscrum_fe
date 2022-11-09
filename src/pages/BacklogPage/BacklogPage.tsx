import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import BacklogSection from './BacklogSection/BacklogSection';
import styles from './BacklogPage.module.scss';
import { getBacklog } from '../../api/backlog/backlog';
import { getStatuses } from '../../api/status/status';

export default function BacklogPage() {
  // WIP need to communicate with backend
  const [loaded, setLoaded] = useState(false);
  const [backlogData, setBacklogData] = useState(null);
  const [statusLoaded, setStatusLoaded] = useState(false);
  const [statusData, setStatusData] = useState([]);
  const { projectId = '', boardId = '' } = useParams();

  const getBacklogDataApi = useCallback(() => {
    const getBacklogData = async () => {
      try {
        const res = await getBacklog(projectId);
        setBacklogData(res.backlog);
        // eslint-disable-next-line no-console
        console.log(res.backlog.cards[0].assignId);
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

  useEffect(() => {
    const getStatusData = async () => {
      try {
        const res = await getStatuses(boardId);
        setStatusData(res);
        setStatusLoaded(true);

        // eslint-disable-next-line no-console, no-underscore-dangle
        // console.log(res[0]._id);
      } catch (e) {
        setStatusLoaded(false);
      }
    };
    getStatusData();
  }, [boardId]);

  return (
    <div className={styles.container}>
      <div>
        <h1 data-testid="backlog-header">Backlog</h1>
      </div>
      <div className={styles.scrollContainer}>
        <BacklogSection
          backlogData={backlogData}
          getBacklogDataApi={getBacklogDataApi}
          loaded={loaded}
          statusLoaded={statusLoaded}
          statusData={statusData}
        />
      </div>
    </div>
  );
}
