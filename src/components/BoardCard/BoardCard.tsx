/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import CardHeader from './CardHeader/CardHeader';
import CardLeftContent from './CardLeftContent/CardLeftContent';
import CardRightContent from './CardRightContent/CardRightContent';
import { TaskEntity } from '../../api/task/entity/task';
import { IColumnsFromBackend } from '../../types';
import styles from './BoardCard.module.scss';

interface Props {
  columnsInfo: IColumnsFromBackend;
  taskData: TaskEntity | undefined;
  onSave: (updatedTaskInfo: TaskEntity) => void;
  updateIsViewTask: () => void;
  deleteTask: () => void;
  labels: any;
  // onChangeFilterLabel: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSaveLabel: () => void;
}

export default function BoardCard({
  columnsInfo,
  taskData,
  onSave,
  deleteTask,
  updateIsViewTask,
  labels,
  // onChangeFilterLabel,
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
            onSave={onSave}
            // onChangeFilterLabel={onChangeFilterLabel}
            onClickSaveLabel={onClickSaveLabel}
          />
        </div>
      </div>
    </div>
  );
}
