import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
// import { AiOutlineSearch } from 'react-icons/ai';
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

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(inputQuery);
  }, [inputQuery]);

  const chaneSelectedUsers = (isExist, user) => {
    if (!isExist) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser.id !== user.id));
    }
  };

  // useEffect(() => {
  //   let filterCase = '';
  //   selectedUsers.forEach((selectedUser) => {
  //     filterCase = filterCase.concat(`-${selectedUser.id}`);
  //   });
  //   filterCase = filterCase.slice(1);
  //   const filterBacklogData = async () => {
  //     const res = await filterBacklog(projectId, filterCase);
  //     setBacklogData(res.backlog);
  //   };
  //   filterBacklogData();
  // }, [projectId, selectedUsers]);

  useEffect(() => {
    const backlogFilter = async () => {
      const dataForFilter = await getBacklog(projectId);
      const backlogDataForFilter = dataForFilter.backlog;
      const sprintDataForFilter = dataForFilter.sprints;
      if (selectedUsers.length > 0) {
        if (backlogDataForFilter.cards) {
          const filteredBacklog = backlogDataForFilter.cards.filter((singleData) =>
            selectedUsers.some((selectedUser) => {
              if (selectedUser.id === null) {
                return false;
              }
              return singleData.assignId?.id === selectedUser.id;
            })
          );
          const filteredBacklogData = {
            cards: filteredBacklog
          };
          setBacklogData(filteredBacklogData);
        }
        const filteredSprints: any[] = [];
        sprintDataForFilter.forEach((singleSprintDataFilter) => {
          if (singleSprintDataFilter) {
            if (!singleSprintDataFilter.isComplete) {
              const tasks = singleSprintDataFilter.taskId.filter((task) => {
                return selectedUsers.some((selectedUser) => {
                  if (selectedUser.id === null) {
                    return false;
                  }
                  if (task.assignId === null) {
                    return false;
                  }
                  return task.assignId.id === selectedUser.id;
                });
              });
              const filteredSprint = { ...singleSprintDataFilter, taskId: tasks };
              filteredSprints.push(filteredSprint);
            }
          }
        });
        setSprintData(filteredSprints);
      } else {
        setBacklogData(backlogDataForFilter);
        setSprintData(sprintDataForFilter);
      }
    };
    backlogFilter();
  }, [projectId, selectedUsers]);

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
