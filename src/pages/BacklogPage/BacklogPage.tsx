import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import BacklogSection from './BacklogSection/BacklogSection';
import styles from './BacklogPage.module.scss';
import { getBacklog } from '../../api/backlog/backlog';
import { getUsers } from '../../api/user/user';

export default function BacklogPage() {
  // WIP need to communicate with backend
  const [loaded, setLoaded] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const [backlogData, setBacklogData] = useState(null);
  const { projectId = '' } = useParams();
  const [userList, setUserList] = useState<any>([]);

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

  useEffect(() => {
    const getUsersList = async () => {
      try {
        if (userList.length === 0) {
          const res = await getUsers();
          setUserList(res.data);
          setUserLoaded(true);
        }
      } catch (e) {
        setUserLoaded(false);
      }
    };
    getUsersList();
  }, [userList]);

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
          userLoaded={userLoaded}
          userList={userList}
        />
      </div>
    </div>
  );
}
