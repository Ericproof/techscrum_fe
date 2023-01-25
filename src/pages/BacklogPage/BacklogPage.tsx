import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import BacklogSection from './BacklogSection/BacklogSection';
import styles from './BacklogPage.module.scss';
import { getBacklog, updateTask, updateBacklogOrder } from '../../api/backlog/backlog';
import { getStatuses } from '../../api/status/status';
import { getTypes } from '../../api/types/types';
import { getUsers } from '../../api/user/user';
import { showProject } from '../../api/projects/projects';
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
  const [otherDataLoaded, setOtherDataLoaded] = useState(false);
  const [projectKey, setProjectKey] = useState('');

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

  const getOtherDataApi = useCallback(() => {
    const getOtherData = async () => {
      try {
        let res = await getTypes();
        setTypesData(res);
        res = await getStatuses(boardId);
        setStatusData(res);
        res = await getUsers();
        setUserList(res.data);
        res = await showProject(projectId, localStorage.getItem('access_token') ?? '');
        setProjectKey(res.data.key);
        setOtherDataLoaded(true);
      } catch (e) {
        setOtherDataLoaded(false);
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      }
    };
    getOtherData();
  }, [boardId, projectId]);

  useEffect(() => {
    getBacklogDataApi();
    getOtherDataApi();
  }, [getBacklogDataApi, getOtherDataApi]);

  const finishLoading = loaded && otherDataLoaded;

  const updateTaskSprintIdApi = (id: string, sprintId: string | null) => {
    const data = { sprintId };
    updateTask(id, data);
  };
  const onDragEventHandler = (result: DropResult) => {
    const { destination, source } = result;
    const destinationData = { sprintId: null, data: [] };
    const originData = { sprintId: null, data: [] };
    let currentItem: any = null;
    const updatedBacklogData = { ...backlogData };
    const updatedSprintData = [...sprintData];
    if (source?.droppableId === 'backlog') {
      [currentItem] = updatedBacklogData.cards.splice(source?.index, 1);
      originData.data = updatedBacklogData.cards.map((task) => task.id);
    } else {
      updatedSprintData.forEach((sprint) => {
        if (sprint.id === source?.droppableId) {
          [currentItem] = sprint.taskId.splice(source?.index, 1);
          originData.sprintId = sprint.id;
          originData.data = sprint.taskId.map((task) => task.id);
        }
      });
    }
    if (currentItem) {
      if (destination?.droppableId === 'backlog') {
        currentItem.sprintId = null;
        updatedBacklogData.cards.splice(destination?.index, 0, currentItem);
        destinationData.data = updatedBacklogData.cards.map((task) => task.id);
      } else {
        currentItem.sprintId = destination?.droppableId ?? null;
        updatedSprintData.forEach((sprint) => {
          if (sprint.id === destination?.droppableId) {
            sprint.taskId.splice(destination?.index, 0, currentItem);
            destinationData.sprintId = sprint.id;
            destinationData.data = sprint.taskId.map((task) => task.id);
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
    updateBacklogOrder(projectId, { origin: originData, destination: destinationData });
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
                        projectKey={projectKey}
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
                projectKey={projectKey}
              />
            </>
          )}
        </DragDropContext>
      </div>
    </div>
  );
}
