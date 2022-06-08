import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import style from './BoardMain.module.scss';
import EL from './img/EL-3.png';
import universalAvatar from './img/10315.svg';

interface ItemFromBackend {
  id: string;
  content: string;
}

interface ColumnsFromBackend {
  [x: string]: { name: string; items: ItemFromBackend[] };
}

const itemFromBackend: ItemFromBackend[] = [
  { id: uuid(), content: 'First task' },
  { id: uuid(), content: 'Second task' },
  { id: uuid(), content: 'Third task' },
  { id: uuid(), content: 'Fourth task' }
];

const columnsFromBackend: ColumnsFromBackend = {
  [uuid()]: {
    name: 'TO DO',
    items: itemFromBackend
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
    return setColumns({
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
                                  <span> {item.content}</span>
                                  <div className={style.cardFooter}>
                                    <div className={style.cardFooterLeft}>
                                      <img src={universalAvatar} alt="Story" />
                                      <span>TEC-66</span>
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
