import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import style from './BoardMain.module.scss';
import EL from './img/EL-3.png';
import universalAvatar from './img/10315.svg';
import { updateTaskStatus } from '../../../api/task/task';
import { ColumnsFromBackend } from '../entity';

interface Props {
  columnsInfo: ColumnsFromBackend;
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

export default function BoardMain({ columnsInfo }: Props) {
  console.log(columnsInfo);
  const [columns, setColumns] = useState<ColumnsFromBackend>({
    '0': {
      name: 'To Do',
      items: []
    },
    '1': {
      name: 'Programming',
      items: [
        {
          id: '62bedf68d7bfe0aa5b180afe',
          tag: 'abc',
          title: 'test',
          statusId: 1,
          assignInfo: {
            id: '629c17f49c0a43d2a090515e',
            email: '350383@qq.com',
            name: '321'
          }
        }
      ]
    },
    '2': {
      name: 'Review',
      items: [
        {
          id: '62beda262da1f1488b5cfe5c',
          tag: 'abc',
          title: 'card2',
          statusId: 2,
          assignInfo: {
            id: '629c17f49c0a43d2a090515e',
            email: '350383@qq.com',
            name: '321'
          }
        }
      ]
    },
    '3': {
      name: 'Done',
      items: [
        {
          id: '62bed9d72da1f1488b5cfe58',
          tag: 'abc',
          title: 'test1',
          statusId: 3,
          assignInfo: {
            id: '629c17f49c0a43d2a090515e',
            email: '350383@qq.com',
            name: '321'
          }
        }
      ]
    }
  });

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
                      <div className={style.name}>
                        {column.name} {column.items.length}{' '}
                        {column.items.length > 1 ? 'issues' : 'issue'}
                      </div>
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
