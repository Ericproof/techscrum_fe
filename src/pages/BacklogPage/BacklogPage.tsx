import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import BacklogSection from './BacklogSection/BacklogSection';
import UserTaskFilter from '../../components/UserTaskFilter/UserTaskFilter';
import styles from './BacklogPage.module.scss';
import { getBacklog, updateBacklogOrder, updateTask } from '../../api/backlog/backlog';
import { getStatuses } from '../../api/status/status';
import { getTypes } from '../../api/types/types';
import { getUsers } from '../../api/user/user';
import { showProject } from '../../api/projects/projects';
import SprintSection from './SprintSection/SprintSection';
import Loading from '../../components/Loading/Loading';
import ProjectNavigationV3 from '../../lib/ProjectNavigationV3/ProjectNavigationV3';
import SearchForBoard from '../../components/SearchForBoard/SearchForBoard';

export default function BacklogPage() {
  const [loaded, setLoaded] = useState(false);
  const [backlogData, setBacklogData] = useState<any>({});
  const [sprintData, setSprintData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState([]);
  const { projectId = '', boardId = '' } = useParams();
  const [typesData, setTypesData] = useState(null);
  const [userList, setUserList] = useState<any>([]);
  const [projectDataLoaded, setProjectDataLoaded] = useState(false);
  const [projectKey, setProjectKey] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [inputState, setInputState] = useState<boolean>(false);
  const [inputQuery, setInputQuery] = useState<string>('');
  const page = 'backlog';

  const chaneSelectedUsers = (isExist, user) => {
    if (!isExist) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser.id !== user.id));
    }
  };

  useEffect(() => {
    const backlogFilter = async () => {
      const dataForFilter = await getBacklog(projectId);
      const sprintDataForFilter = dataForFilter.sprints;
      const sprintsNotCompleted = sprintDataForFilter.filter((singleSprint) => {
        return singleSprint.isComplete === false;
      });

      const BacklogFilter = (inputList, userInput, queryInput) => {
        return inputList.filter((singleCard) => {
          if (!queryInput && !userInput) {
            return true;
          }
          if (singleCard.assignId === null) {
            if (queryInput !== null && selectedUsers.length > 0) {
              return false;
            }
          }
          return (
            (queryInput === 0 ||
              singleCard.title?.toLowerCase().includes(queryInput.toLowerCase())) &&
            (userInput.length === 0 ||
              userInput.some((selectedUser) => selectedUser.id === singleCard.assignId.id))
          );
        });
      };

      const filteredBacklogData = {
        cards: BacklogFilter(dataForFilter.backlog.cards, selectedUsers, inputQuery)
      };
      const filteredSprints: any[] = [];
      sprintsNotCompleted.forEach((sprintNotCompleted) => {
        const singleNotCompletedSprint = {
          ...sprintNotCompleted,
          taskId: BacklogFilter(sprintNotCompleted.taskId, selectedUsers, inputQuery)
        };
        filteredSprints.push(singleNotCompletedSprint);
      });

      setBacklogData(filteredBacklogData);
      setSprintData(filteredSprints);
    };
    backlogFilter();
  }, [projectId, inputQuery, selectedUsers]);

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

  const getProjectDataApi = useCallback(() => {
    const getProjectData = async () => {
      try {
        let res = await getTypes();
        setTypesData(res);
        res = await getStatuses(boardId);
        setStatusData(res);
        res = await getUsers();
        setUserList(res.data);
        res = await showProject(projectId, localStorage.getItem('access_token') ?? '');
        setProjectKey(res.data.key);
        setProjectDataLoaded(true);
      } catch (e) {
        setProjectDataLoaded(false);
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      }
    };
    getProjectData();
  }, [boardId, projectId]);

  useEffect(() => {
    getBacklogDataApi();
    getProjectDataApi();
  }, [getBacklogDataApi, getProjectDataApi]);

  const finishLoading = loaded && projectDataLoaded;

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
              <div className={styles.BacklogSearchFilter}>
                <div className={styles.BacklogSearchArea}>
                  <SearchForBoard
                    inputState={inputState}
                    setInputQuery={setInputQuery}
                    setInputState={setInputState}
                    page={page}
                  />
                </div>
                <UserTaskFilter
                  selectedUsers={selectedUsers}
                  changeSelectedUsers={chaneSelectedUsers}
                  userList={userList}
                />
              </div>
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
