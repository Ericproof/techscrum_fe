import React, { useEffect, useState } from 'react';
import CardHeader from './CardHeader/CardHeader';
import CardLeftContent from './CardLeftContent/CardLeftContent';
import CardRightContent from './CardRightContent/CardRightContent';
import { TaskEntity } from '../../api/task/entity/task';
import styles from './BoardCard.module.scss';

interface Props {
  updateIsViewTask: () => void;
  taskData: TaskEntity;
}

export default function BoardCard({ updateIsViewTask, taskData }: Props) {
  const [taskInfo, setTaskInfo] = useState({});
  useEffect(() => {
    setTaskInfo(taskData);
  }, [taskData]);
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <CardHeader updateIsViewTask={updateIsViewTask} taskInfo={taskInfo} />
        <div className={styles.cardContent}>
          <CardLeftContent taskInfo={taskInfo} />
          <CardRightContent taskInfo={taskInfo} />
        </div>
      </div>
    </div>
  );
}
