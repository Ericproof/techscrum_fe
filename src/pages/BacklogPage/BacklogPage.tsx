import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import BacklogSection from './BacklogSection/BacklogSection';
import styles from './BacklogPage.module.scss';
import { getBacklog, updateTask } from '../../api/backlog/backlog';
import { getStatuses } from '../../api/status/status';
import { getTypes } from '../../api/types/types';
import { getUsers } from '../../api/user/user';
import SprintSection from './SprintSection/SprintSection';
import Loading from '../../components/Loading/Loading';
import ProjectNavigationV3 from '../../lib/ProjectNavigationV3/ProjectNavigationV3';

export default function BacklogPage() {
  const [loaded, setLoaded] = useState(false);
  const [backlogData, setBacklogData] = useState<any>({});
  const [sprintData, setSprintData] = useState<any[]>([]);
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

  const updateTaskSprintIdApi = (id: string, sprintId: string | null) => {
    const data = { sprintId };
    updateTask(id, data);
  };
  const onDragEventHandler = (result: DropResult) => {
    const { destination, source } = result;
    let currentItem: any = null;
    const updatedBacklogData = { ...backlogData };
    const updatedSprintData = [...sprintData];
    if (source?.droppableId === 'backlog') {
      [currentItem] = updatedBacklogData.cards.splice(source?.index, 1);
    } else {
      updatedSprintData.forEach((sprint) => {
        if (sprint.id === source?.droppableId) {
          [currentItem] = sprint.taskId.splice(source?.index, 1);
        }
      });
    }
    if (currentItem) {
      if (destination?.droppableId === 'backlog') {
        currentItem.sprintId = null;
        updatedBacklogData.cards.splice(destination?.index, 0, currentItem);
      } else {
        currentItem.sprintId = destination?.droppableId ?? null;
        updatedSprintData.forEach((sprint) => {
          if (sprint.id === destination?.droppableId) {
            sprint.taskId.splice(destination?.index, 0, currentItem);
          }
        });
      }
    }

    if (destination?.droppableId !== source?.droppableId && currentItem) {
      if (destination?.droppableId === 'backlog') {
        updateTaskSprintIdApi(currentItem.id, null);
      } else {
        updateTaskSprintIdApi(currentItem.id, destination?.droppableId ?? null);
      }
    }
    setBacklogData(updatedBacklogData);
    setSprintData(updatedSprintData);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.header} data-testid="backlog-header">
        Backlog
      </h1>
      <ProjectNavigationV3 />
      {!finishLoading && <Loading />}
      <div className={styles.scrollContainer}>
        <DragDropContext
          onDragEnd={(result) => {
            onDragEventHandler(result);
          }}
        >
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
        </DragDropContext>
      </div>
    </div>
  );
}
