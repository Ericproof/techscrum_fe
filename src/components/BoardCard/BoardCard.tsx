/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import CardHeader from './CardHeader/CardHeader';
import CardLeftContent from './CardLeftContent/CardLeftContent';
import CardRightContent from './CardRightContent/CardRightContent';
import { TaskEntity } from '../../api/task/entity/task';
import { IColumnsFromBackend } from '../../types';
import styles from './BoardCard.module.scss';

interface Props {
  updateIsViewTask: () => void;
  taskData: TaskEntity | undefined;
  columnsInfo: IColumnsFromBackend;
  onSave: (updatedTaskInfo: TaskEntity) => void;
  deleteTask: () => void;
  labels: any;
  onChangeFilterLabel: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSaveLabel: () => void;
}

export default function BoardCard({
  updateIsViewTask,
  taskData,
  onSave,
  columnsInfo,
  deleteTask,
  labels,
  onChangeFilterLabel,
  onClickSaveLabel
}: Props) {
  const [taskInfo, setTaskInfo] = useState<TaskEntity | null>(null);

  useEffect(() => {
    if (!taskData) {
      return;
    }
    setTaskInfo(taskData);
  }, [taskData]);

  if (!taskInfo) {
    return <></>;
  }

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
            labels={labels}
            onChangeFilterLabel={onChangeFilterLabel}
            onClickSaveLabel={onClickSaveLabel}
          />
        </div>
      </div>
    </div>
  );
}
