import React, { useEffect, useState } from 'react';
import CardHeader from './CardHeader/CardHeader';
import CardLeftContent from './CardLeftContent/CardLeftContent';
import CardRightContent from './CardRightContent/CardRightContent';
import { TaskEntity } from '../../api/task/entity/task';
import { IColumnsFromBackend } from '../../types';
import styles from './BoardCard.module.scss';

interface Props {
  columnsInfo: IColumnsFromBackend;
  taskData: TaskEntity;
  onSave: (updatedTaskInfo: TaskEntity) => void;
  updateIsViewTask: () => void;
  deleteTask: () => void;
}

export default function BoardCard({
  columnsInfo,
  taskData,
  onSave,
  updateIsViewTask,
  deleteTask
}: Props) {
  const [taskInfo, setTaskInfo] = useState({});
  useEffect(() => {
    setTaskInfo(taskData);
  }, [taskData]);
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <CardHeader
          updateIsViewTask={updateIsViewTask}
          taskInfo={taskInfo}
          deleteTask={deleteTask}
        />
        <div className={styles.cardContent}>
          <CardLeftContent taskInfo={taskInfo} onSave={onSave} />
          <CardRightContent
            taskInfo={taskInfo}
            columnsInfo={columnsInfo}
            taskStatusOnchange={onSave}
          />
        </div>
      </div>
    </div>
  );
}
