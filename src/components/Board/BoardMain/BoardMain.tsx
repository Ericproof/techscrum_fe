/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { IStatusEntity } from '../../../types';
import Loading from '../../Loading/Loading';
import styles from './BoardMain.module.scss';
import checkAccess from '../../../utils/helpers';

interface Props {
  taskStatus: IStatusEntity[];
  onDragEventHandler: (result: DropResult) => boolean | void | null;
  passTaskId: (itemId: string) => void;
  updateIsCreateNewCard: () => void;
  projectId: string;
}

export default function BoardMain({
  taskStatus,
  onDragEventHandler,
  passTaskId,
  updateIsCreateNewCard,
  projectId
}: Props) {
  if (taskStatus.length < 1) {
    return <Loading />;
  }

  return (
    <div className={styles.boardMainContainer}>
      <DragDropContext
        onDragEnd={(result) => {
          onDragEventHandler(result);
        }}
      >
        {taskStatus.map((status) => {
          const { id, name } = status;
          return (
            <div key={id} className={styles.columnsContainer}>
              <Droppable droppableId={id} key={id}>
                {(provided) => {
                  return (
                    <div
                      /* eslint-disable react/jsx-props-no-spreading */
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={styles.column}
                    >
                      {/* status name */}
                      <div className={styles.columnInfo}>
                        <h1 className={styles.name} data-testid={`board-col-${id}`}>
                          {name}
                        </h1>
                        <h1 className={styles.taskNum}>{status.taskList.length}</h1>
                      </div>
                      {/* tasks in status */}
                      {status.taskList.map((task, index) => {
                        return (
                          <Draggable key={task.id} draggableId={task.id ?? ''} index={index}>
                            {(provided2) => {
                              return (
                                <div
                                  className={styles.card}
                                  ref={provided2.innerRef}
                                  {...provided2.dragHandleProps}
                                  {...provided2.draggableProps}
                                  aria-hidden="true"
                                  onClick={() => {
                                    passTaskId(task.id ?? '');
                                  }}
                                  data-testid={`task-${task.id}`}
                                >
                                  <span>
                                    {' '}
                                    {task.tags?.map((tag) => {
                                      return (
                                        <div className={styles.tag} key={tag.id}>
                                          <h1>{tag.name}</h1>
                                        </div>
                                      );
                                    })}
                                  </span>
                                  <p>{task.title ?? ''}</p>
                                  <div className={styles.cardFooter}>
                                    <div className={styles.cardFooterLeft}>
                                      <span>
                                        Due Date:{' '}
                                        {task.dueAt?.toString().split('T')[0].split('-')[2]}/
                                        {task.dueAt?.toString().split('T')[0].split('-')[1]}/
                                        {task.dueAt?.toString().split('T')[0].split('-')[0]}
                                      </span>
                                    </div>
                                    <div className={styles.cardFooterRight}>
                                      <img
                                        src={
                                          task.assignee
                                            ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
                                            : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
                                        }
                                        alt="avatar"
                                        className={styles.avatorIcon}
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                      {checkAccess('add:tasks', projectId) && (
                        <div
                          className={[
                            styles.card,
                            styles.cardAddNewCard,
                            styles.cardAddNewCardHide
                          ].join(' ')}
                          onClick={updateIsCreateNewCard}
                          onKeyDown={updateIsCreateNewCard}
                          role="button"
                          tabIndex={0}
                        >
                          <p>+ Add Task</p>
                        </div>
                      )}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
      <div className={[styles.columnsContainer, styles.lastColumnContainer].join(' ')}>
        <span>+ Add Columns</span>
      </div>
    </div>
  );
}
