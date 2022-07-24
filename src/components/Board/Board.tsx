import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DropResult } from 'react-beautiful-dnd';
import style from './Board.module.scss';
import BoardSearch from './BoardSearch/BoardSearch';
import BoardMain from './BoardMain/BoardMain';
import ProjectHeader from '../ProjectHeader/ProjectHeader';
import CreateNewCard from '../CreateNewCard/CreateNewCard';
import HeaderNav from './HeaderNav/HeaderNav';
import { getBoard } from '../../api/board/board';
import { updateTaskStatus, fetchTask, updateTask, removeTask } from '../../api/task/task';
import IBoardEntity, { IColumnsFromBackend, ICardData, ITaskCard } from '../../types';
import BoardCard from '../BoardCard/BoardCard';
import { TaskEntity } from '../../api/task/entity/task';

const projects = [
  {
    id: 0,
    star: false,
    icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10418?size=small',
    name: 'example',
    key: 'EX',
    type: 'Team-managed software',
    lead: 'Evan Lin',
    avatar:
      'https://i2.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/EL-3.png?ssl=1',
    lastEditTime: new Date('2021-05-10')
  },
  {
    id: 1,
    star: false,
    icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10411?size=small',
    name: 'TECHSCRUM',
    key: 'TEC',
    type: 'Team-managed software',
    lead: 'Yiu Kitman',
    avatar:
      'https://i2.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/YK-3.png?ssl=1',
    lastEditTime: new Date('2021-05-11')
  },
  {
    id: 2,
    star: false,
    icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10412?size=small',
    name: 'Template',
    key: 'TEM',
    type: 'Company-managed software',
    lead: 'Yiu Kitman',
    avatar:
      'https://i2.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/YK-3.png?ssl=1',
    lastEditTime: new Date('2021-05-8')
  }
];

const onDragEnd = (
  result: DropResult,
  columns: IColumnsFromBackend,
  setColumns: (arg0: IColumnsFromBackend) => void
) => {
  if (!result.destination) return null;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    removed.statusId = destination.droppableId;
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
    updateTaskStatus(result.draggableId, destination.droppableId, destination.index);
    return true;
  }

  const column = columns[source.droppableId];
  const copiedItems = [...column.items];
  const [removed] = copiedItems.splice(source.index, 1);
  copiedItems.splice(destination.index, 0, removed);
  setColumns({
    ...columns,
    [source.droppableId]: {
      ...column,
      items: copiedItems
    }
  });
  updateTaskStatus(result.draggableId, source.droppableId, destination.index);
  return true;
};

export default function Board() {
  const [inputQuery, setInputQuery] = useState<string>('');
  const [columnsInfo, setColumnsInfo] = useState<IColumnsFromBackend>({});
  const { boardId = '' } = useParams();

  const projectsOrderbyDate = projects.sort((a, b) => {
    return a.lastEditTime < b.lastEditTime ? 1 : -1;
  });
  const [projectList] = useState(projectsOrderbyDate);
  const [value, setValue] = useState(0);
  const [isCreateNewCard, setIsCreateNewCard] = useState(false);
  const [isViewTask, setIsViewTask] = useState(false);
  const [taskData, setTaskData] = useState<TaskEntity>({});

  const getProjectFromChildren = (index: number) => {
    projectList[index].star = !projectList[index].star;
    setValue(value + 1);
  };

  const getCreateNewCardStateFromChildren = () => {
    setIsCreateNewCard(!isCreateNewCard);

    // setTaskList([...taskList, ...newTask])
  };

  const getViewTaskStateFromChildren = () => {
    setIsViewTask(!isViewTask);
  };

  const getTaskId = async (itemId: string) => {
    const res = await fetchTask(itemId);
    if (res.status !== 200) {
      return;
    }
    setTaskData(res.data);
    getViewTaskStateFromChildren();
  };

  const fetchNewCard = (newCard: ICardData) => {
    getCreateNewCardStateFromChildren();
    const newItem: ITaskCard = {
      id: newCard.id,
      tag: newCard.tag,
      title: newCard.title,
      statusId: newCard.statusId
    };
    const columns = columnsInfo;
    columns[newCard.statusId ?? ''].items.push(newItem);
    setColumnsInfo(columns);
  };

  const dragEventHandler = (result: DropResult) => {
    return onDragEnd(result, columnsInfo, setColumnsInfo);
  };

  const updateTaskInfo = async (newTaskInfo: TaskEntity) => {
    try {
      if (newTaskInfo.id !== undefined) {
        const req = await updateTask(newTaskInfo.id, newTaskInfo);
        const updatedTaskInfo = req.data;
        const updatedColumns = { ...columnsInfo };
        if (updatedTaskInfo.statusId !== undefined && taskData.statusId !== undefined) {
          columnsInfo[taskData.statusId].items.forEach((item, index) => {
            if (
              item.id === updatedTaskInfo.id &&
              updatedTaskInfo.title !== undefined &&
              updatedTaskInfo.title != null &&
              item.statusId !== undefined &&
              updatedTaskInfo.statusId !== undefined
            ) {
              const updatedTitle = updatedTaskInfo.title;
              const updatedStatusId = updatedTaskInfo.statusId;
              const updatedItem = { ...item, title: updatedTitle, statusId: updatedStatusId };
              if (updatedStatusId === item.statusId) {
                updatedColumns[item.statusId].items[index] = updatedItem;
                return;
              }
              updatedColumns[item.statusId].items.splice(index, 1);
              updatedColumns[updatedStatusId].items.push(updatedItem);
            }
          });
        }
        setColumnsInfo(updatedColumns);
        setTaskData(updatedTaskInfo);
      }
    } catch (e) {
      getViewTaskStateFromChildren();
    }
  };

  const deleteTask = async () => {
    if (taskData.id !== undefined && taskData.id != null) {
      try {
        await removeTask(taskData.id);
      } finally {
        getViewTaskStateFromChildren();
        const updatedColumns = { ...columnsInfo };
        if (taskData.statusId !== undefined) {
          columnsInfo[taskData.statusId].items.forEach((item, index) => {
            if (item.statusId !== undefined && item.id === taskData.id) {
              updatedColumns[item.statusId].items.splice(index, 1);
            }
          });
        }
        setColumnsInfo(updatedColumns);
        setTaskData({});
      }
    }
  };
  useEffect(() => {
    const fetchColumnsData = (boardInfo: IBoardEntity) => {
      let columnInfoData: IColumnsFromBackend = {};
      const { taskStatus, taskList } = boardInfo;
      taskStatus.forEach((status, index) => {
        const tasks: ITaskCard[] = [];
        status.items.forEach((item) => {
          const result = taskList[index].find((task) => {
            return task.id === item.taskId;
          });
          if (result !== undefined) tasks.push(result);
        });
        columnInfoData = { ...columnInfoData, [status.id]: { name: status.name, items: tasks } };
      });
      setColumnsInfo(columnInfoData);
    };

    const fetchBoardInfo = async () => {
      const boardInfo = await getBoard(boardId);
      fetchColumnsData(boardInfo);
    };
    fetchBoardInfo();
  }, [inputQuery, boardId]);
  return (
    <div className={style.container}>
      <ProjectHeader />
      <HeaderNav name="projects" />
      <BoardSearch
        updateIsCreateNewCard={getCreateNewCardStateFromChildren}
        setInputQuery={setInputQuery}
      />
      <BoardMain
        columnsInfo={columnsInfo}
        onDragEventHandler={dragEventHandler}
        passTaskId={getTaskId}
      />
      {isCreateNewCard && (
        <CreateNewCard
          fetchNewCard={fetchNewCard}
          updateIsCreateNewCard={getCreateNewCardStateFromChildren}
        />
      )}
      {isViewTask && (
        <BoardCard
          updateIsViewTask={getViewTaskStateFromChildren}
          taskData={taskData}
          onSave={updateTaskInfo}
          columnsInfo={columnsInfo}
          deleteTask={deleteTask}
        />
      )}
    </div>
  );
}
