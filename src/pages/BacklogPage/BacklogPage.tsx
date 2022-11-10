import React, { useEffect, useState, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import BacklogSection from './BacklogSection/BacklogSection';
import styles from './BacklogPage.module.scss';
import { getBacklog } from '../../api/backlog/backlog';
import { getStatuses } from '../../api/status/status';
import { getTypes } from '../../api/types/types';
import { getUsers } from '../../api/user/user';

export default function BacklogPage() {
  const [loaded, setLoaded] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const [backlogData, setBacklogData] = useState(null);
  const [statusLoaded, setStatusLoaded] = useState(false);
  const [statusData, setStatusData] = useState([]);
  const { projectId = '', boardId = '' } = useParams();
  const [typesData, setTypesData] = useState(null);
  const [typesLoaded, setTypesLoaded] = useState(false);
  const [userList, setUserList] = useState<any>([]);

  const getBacklogDataApi = useCallback(() => {
    const getBacklogData = async () => {
      try {
        const res = await getBacklog(projectId);
        setBacklogData(res.backlog);
        setLoaded(true);
      } catch (e) {
        setLoaded(false);
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      }
    };
    getBacklogData();
  }, [projectId]);

  useEffect(() => {
    const getTypesData = async () => {
      try {
        const res = await getTypes();
        setTypesData(res);
        setTypesLoaded(true);
      } catch (e) {
        setTypesLoaded(false);
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      }
    };
    getTypesData();
  }, []);

  useEffect(() => {
    getBacklogDataApi();
  }, [getBacklogDataApi]);

  useEffect(() => {
    const getStatusData = async () => {
      try {
        const res = await getStatuses(boardId);
        setStatusData(res);
        setStatusLoaded(true);
      } catch (e) {
        setStatusLoaded(false);
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      }
    };
    getStatusData();
  }, [boardId]);

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
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      }
    };
    getUsersList();
  }, [userList.length]);

  return (
    <div className={styles.container}>
      <ToastContainer style={{ width: '400px' }} />
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
          typesLoaded={typesLoaded}
          typesData={typesData}
          userLoaded={userLoaded}
          userList={userList}
        />
      </div>
    </div>
  );
}
