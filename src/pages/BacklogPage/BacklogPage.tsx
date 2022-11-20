import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import BacklogSection from './BacklogSection/BacklogSection';
import styles from './BacklogPage.module.scss';
import { getBacklog } from '../../api/backlog/backlog';
import { getStatuses } from '../../api/status/status';
import { getTypes } from '../../api/types/types';
import { getUsers } from '../../api/user/user';
import SprintSection from './SprintSection/SprintSection';
import Loading from '../../components/Loading/Loading';

export default function BacklogPage() {
  const [loaded, setLoaded] = useState(false);
  const [backlogData, setBacklogData] = useState(null);
  const [sprintData, setSprintData] = useState([]);
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
        setSprintData(res.sprints);
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

  const finishLoading = loaded && typeStatusUserLoaded;
  return (
    <div className={styles.container}>
      <div>
        <h1 data-testid="backlog-header">Backlog</h1>
      </div>
      {!finishLoading && <Loading />}
      <div className={styles.scrollContainer}>
        {finishLoading && (
          <>
            {sprintData
              .filter((sprint: any) => {
                return !sprint.isComplete;
              })
              .map((sprint: any) => {
                return (
                  <React.Fragment key={sprint.id}>
                    <SprintSection
                      sprint={sprint}
                      sprintData={sprintData}
                      getBacklogDataApi={getBacklogDataApi}
                      statusData={statusData}
                      typesData={typesData}
                      userList={userList}
                    />
                  </React.Fragment>
                );
              })}

            <BacklogSection
              backlogData={backlogData}
              sprintData={sprintData}
              getBacklogDataApi={getBacklogDataApi}
              statusData={statusData}
              typesData={typesData}
              userList={userList}
            />
          </>
        )}
      </div>
    </div>
  );
}
