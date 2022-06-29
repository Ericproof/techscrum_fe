import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import style from './BoardMain.module.scss';
import EL from './img/EL-3.png';
import universalAvatar from './img/10315.svg';
import boardAPI from '../../../api/board/board';
import Board from '../../../api/board/entity/board';
import { updateTaskStatus } from '../../../api/task/task';

interface Assign {
  id?: string;
  email?: string;
  name?: string;
}
interface ItemFromBackend {
  id: string;
  tag: string;
  title: string;
  statusId: number;
  assignInfo?: Assign;
}

interface ColumnsFromBackend {
  [x: string]: { name: string; items: ItemFromBackend[] };
}

const columnsFromBackend: ColumnsFromBackend = {
  [uuid()]: {
    name: 'TO DO',
    items: []
  },
  [uuid()]: {
    name: 'IN PROGRESS',
    items: []
  },
  [uuid()]: {
    name: 'PR REVIEW',
    items: []
  },
  [uuid()]: {
    name: 'TESTING',
    items: []
  },
  [uuid()]: {
    name: 'DONE',
    items: []
  }
};

const onDragEnd = (
  result: DropResult,
  columns: ColumnsFromBackend,
  setColumns: (arg0: ColumnsFromBackend) => void
) => {
  if (!result.destination) return null;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    updateTaskStatus(result.draggableId, parseInt(result.destination.droppableId, 10));
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
    return true;
  }

  const column = columns[source.droppableId];
  const copiedItems = [...column.items];
  const [removed] = copiedItems.splice(source.index, 1);
  copiedItems.splice(destination.index, 0, removed);
  return setColumns({
    ...columns,
    [source.droppableId]: {
      ...column,
      items: copiedItems
    }
  });
};

export default function BoardMain() {
  const [columns, setColumns] = useState(columnsFromBackend);
  useEffect(() => {
    const fetchColumnsData = (boardInfo: Board) => {
      let columnsInfo: ColumnsFromBackend = {};
      boardInfo.taskStatus.forEach((status, index) => {
        const tasks: ItemFromBackend[] = boardInfo.taskList.filter(
          (task) => task.statusId === index
        );
        columnsInfo = { ...columnsInfo, [index.toString()]: { name: status, items: tasks } };
      });
      setColumns(columnsInfo);
    };

    const fetchBoardInfo = async () => {
      const boardInfo = await boardAPI();
      fetchColumnsData(boardInfo);
    };
    fetchBoardInfo();
  }, []);

  return (
    <div className={style.container}>
      <DragDropContext
        onDragEnd={(result) => {
          onDragEnd(result, columns, setColumns);
        }}
      >
        {Object.entries(columns).map(([id, column]) => {
          return (
            <div key={id} className={style.columnsContainer}>
              <Droppable droppableId={id} key={id}>
                {(provided) => {
                  return (
                    <div
                      /* eslint-disable react/jsx-props-no-spreading */
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={style.column}
                    >
                      <div className={style.name}>{column.name}</div>
                      {column.items.map((item, index) => {
                        return (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided2) => {
                              return (
                                <div
                                  className={style.card}
                                  ref={provided2.innerRef}
                                  {...provided2.dragHandleProps}
                                  {...provided2.draggableProps}
                                >
                                  <span> {item.title}</span>
                                  <div className={style.cardFooter}>
                                    <div className={style.cardFooterLeft}>
                                      <img src={universalAvatar} alt="Story" />
                                      <span>{item.tag}</span>
                                    </div>
                                    <div className={style.cardFooterRight}>
                                      <img src={EL} alt="avatar" />
                                    </div>
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}
