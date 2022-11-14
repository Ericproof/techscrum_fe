import React, { useEffect, useState, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import BacklogSection from './BacklogSection/BacklogSection';
import styles from './BacklogPage.module.scss';
import { getBacklog } from '../../api/backlog/backlog';
import { getStatuses } from '../../api/status/status';
import { getTypes } from '../../api/types/types';
import { getUsers } from '../../api/user/user';
import SprintSection from './SprintSection/SprintSection';

export default function BacklogPage() {
  const [loaded, setLoaded] = useState(false);
  const [backlogData, setBacklogData] = useState(null);
  // const [sprintData, setSprintData] = useState(null);
  const [statusData, setStatusData] = useState([]);
  const { projectId = '', boardId = '' } = useParams();
  const [typesData, setTypesData] = useState(null);
  const [userList, setUserList] = useState<any>([]);
  const [typeStatusUserLoaded, setTypeStatusUserLoaded] = useState(false);

  const getBacklogDataApi = useCallback(() => {
    const getBacklogData = async () => {
      try {
        const res = await getBacklog(projectId);
        setBacklogData(res.backlog);
        // eslint-disable-next-line no-console
        console.log(res.backlog);
        // setSprintData(res.sprint);
        setLoaded(true);
      } catch (e) {
        setLoaded(false);
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      }
    };
    getBacklogData();
  }, [projectId]);

  const getTypesStatusesUsersDataApi = useCallback(() => {
    const getTypesStatusesUsersData = async () => {
      try {
        let res = await getTypes();
        setTypesData(res);
        res = await getStatuses(boardId);
        setStatusData(res);
        res = await getUsers();
        setUserList(res.data);
        setTypeStatusUserLoaded(true);
      } catch (e) {
        setTypeStatusUserLoaded(false);
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      }
    };
    getTypesStatusesUsersData();
  }, [boardId]);

  useEffect(() => {
    getBacklogDataApi();
    getTypesStatusesUsersDataApi();
  }, [getBacklogDataApi, getTypesStatusesUsersDataApi]);

  return (
    <div className={styles.container}>
      <ToastContainer style={{ width: '400px' }} />
      <div>
        <h1 data-testid="backlog-header">Backlog</h1>
      </div>
      <div className={styles.scrollContainer}>
        <SprintSection
          sprintData={{ cards: [] }}
          getBacklogDataApi={getBacklogDataApi}
          loaded={loaded}
          statusData={statusData}
          typesData={typesData}
          userList={userList}
          typeStatusUserLoaded={typeStatusUserLoaded}
        />
        <BacklogSection
          backlogData={backlogData}
          getBacklogDataApi={getBacklogDataApi}
          loaded={loaded}
          statusData={statusData}
          typesData={typesData}
          userList={userList}
          typeStatusUserLoaded={typeStatusUserLoaded}
        />
      </div>
    </div>
  );
}
