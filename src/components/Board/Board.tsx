/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DropResult } from 'react-beautiful-dnd';
import style from './Board.module.scss';
import BoardSearch from './BoardSearch/BoardSearch';
import BoardMain from './BoardMain/BoardMain';
import CreateNewCard from '../CreateNewCard/CreateNewCard';
import { getBoard } from '../../api/board/board';
import { updateTaskStatus, fetchTask, updateTask, removeTask } from '../../api/task/task';
import IBoardEntity, { IColumnsFromBackend, ICardData, ILabelData, ITaskCard } from '../../types';
import BoardCard from '../BoardCard/BoardCard';
import { TaskEntity } from '../../api/task/entity/task';
import { getLabels } from '../../api/label/label';

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
  const { boardId = '', projectId = '' } = useParams();
  const [isCreateNewCard, setIsCreateNewCard] = useState(false);
  const [isViewTask, setIsViewTask] = useState(false);
  const [taskData, setTaskData] = useState<TaskEntity>();
  const [labels, setLabels] = useState<ILabelData[]>([]);

  useEffect(() => {
    if (!projectId || projectId === '') {
      return;
    }
    getLabels(projectId).then((res) => {
      setLabels(res.data);
    });
  }, [projectId]);

  const getCreateNewCardStateFromChildren = () => {
    setIsCreateNewCard(!isCreateNewCard);
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
    const now = new Date();
    const newItem: ITaskCard = {
      id: newCard.id,
      tags: newCard.tags,
      title: newCard.title,
      statusId: newCard.statusId,
      dueAt: now.toISOString()
    };
    const columns = columnsInfo;
    columns[newCard.statusId ?? ''].items.push(newItem);
    setColumnsInfo(columns);
  };

  const dragEventHandler = (result: DropResult) => {
    return onDragEnd(result, columnsInfo, setColumnsInfo);
  };

  const showUpdatedTask = (updatedTaskInfo: any) => {
    const updatedColumns = { ...columnsInfo };
    if (updatedTaskInfo?.statusId && taskData?.statusId) {
      columnsInfo[taskData.statusId].items.forEach((item, index) => {
        if (
          item.id === updatedTaskInfo.id &&
          updatedTaskInfo.title !== undefined &&
          updatedTaskInfo.title != null &&
          item.statusId !== undefined &&
          updatedTaskInfo.statusId !== undefined
        ) {
          const updatedStatusId = updatedTaskInfo.statusId;
          const updatedItem = { ...item, ...updatedTaskInfo };
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
  };

  const updateTaskInfo = async (newTaskInfo: TaskEntity) => {
    try {
      if (newTaskInfo.id !== undefined) {
        await updateTask(newTaskInfo.id, newTaskInfo);
        showUpdatedTask(newTaskInfo);
      }
    } catch (e) {
      getViewTaskStateFromChildren();
    }
  };

  const updasteTaskInfo = (tags: ILabelData[] | undefined) => {
    if (tags === undefined) return;
    const updatedTaskInfo = { ...taskData, tags };
    showUpdatedTask(updatedTaskInfo);
  };

  const deleteTask = async () => {
    if (taskData?.id ?? taskData?.id) {
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
        setTaskData(undefined);
      }
    }
  };

  useEffect(() => {
    const fetchColumnsData = (boardInfo: IBoardEntity) => {
      const columnInfoData: IColumnsFromBackend = {};

      if (inputQuery) {
        for (const item of boardInfo.taskStatus) {
          columnInfoData[item.id] = {
            name: item.name,
            slug: item.slug,
            order: item.order,
            items: item.taskList.filter((task) =>
              task.title?.toLowerCase().includes(inputQuery.toLowerCase())
            )
          };
        }
        return setColumnsInfo(columnInfoData);
      }

      for (const item of boardInfo.taskStatus) {
        columnInfoData[item.id] = {
          name: item.name,
          slug: item.slug,
          order: item.order,
          items: item.taskList
        };
      }

      return setColumnsInfo(columnInfoData);
    };

    const fetchBoardInfo = async () => {
      const boardInfo = await getBoard(boardId);
      fetchColumnsData(boardInfo);
    };
    fetchBoardInfo();
  }, [inputQuery, boardId]);

  return (
    <div className={style.container}>
      <BoardSearch
        updateIsCreateNewCard={getCreateNewCardStateFromChildren}
        setInputQuery={setInputQuery}
        projectId={projectId}
      />
      <BoardMain
        columnsInfo={columnsInfo}
        onDragEventHandler={dragEventHandler}
        passTaskId={getTaskId}
        updateIsCreateNewCard={getCreateNewCardStateFromChildren}
        projectId={projectId}
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
          labels={labels}
          projectId={projectId}
          updateTaskTags={updasteTaskInfo}
        />
      )}
    </div>
  );
}
