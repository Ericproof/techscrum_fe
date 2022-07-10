import React, { useEffect, useState } from 'react';
import CardHeader from './CardHeader/CardHeader';
import CardLeftContent from './CardLeftContent/CardLeftContent';
import CardRightContent from './CardRightContent/CardRightContent';
import { TaskEntity } from '../../api/task/entity/task';
import { IColumnsFromBackend } from '../../types';
import styles from './BoardCard.module.scss';

interface Props {
  updateIsViewTask: () => void;
  taskData: TaskEntity;
  columnsInfo: IColumnsFromBackend;
  onSave: (updatedTaskInfo: TaskEntity) => void;
}

export default function BoardCard({ updateIsViewTask, taskData, onSave, columnsInfo }: Props) {
  const [taskInfo, setTaskInfo] = useState({});
  useEffect(() => {
    setTaskInfo(taskData);
  }, [taskData]);
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <CardHeader updateIsViewTask={updateIsViewTask} taskInfo={taskInfo} />
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
