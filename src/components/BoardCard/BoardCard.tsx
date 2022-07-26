import React, { useEffect, useState } from 'react';
import CardHeader from './CardHeader/CardHeader';
import CardLeftContent from './CardLeftContent/CardLeftContent';
import CardRightContent from './CardRightContent/CardRightContent';
import { TaskEntity } from '../../api/task/entity/task';
import { IColumnsFromBackend, ILabelData } from '../../types';
import styles from './BoardCard.module.scss';
import { upload } from '../../api/upload/upload';

interface Props {
  columnsInfo: IColumnsFromBackend;
  taskData: TaskEntity | undefined;
  onSave: (updatedTaskInfo: TaskEntity) => void;
  updateIsViewTask: () => void;
  deleteTask: () => void;
  labels: ILabelData[];
}

export default function BoardCard({
  columnsInfo,
  taskData,
  onSave,
  deleteTask,
  updateIsViewTask,
  labels
}: Props) {
  const [taskInfo, setTaskInfo] = useState<TaskEntity | null>(null);

  useEffect(() => {
    if (!taskData) {
      return;
    }
    setTaskInfo(taskData);
  }, [taskData]);

  const removeAttachment = (url: string) => {
    const updateTaskInfo = { ...taskInfo };
    updateTaskInfo.attachmentUrls = taskInfo?.attachmentUrls.filter((photoUrl: string) => {
      return photoUrl !== url;
    });
    setTaskInfo(updateTaskInfo);
    onSave(updateTaskInfo);
  };

  const uploadSuccess = (newPhotoData: any) => {
    const updateTaskInfo = { ...taskInfo };
    updateTaskInfo.attachmentUrls = [...updateTaskInfo.attachmentUrls, newPhotoData[0].location];
    setTaskInfo(updateTaskInfo);
    onSave(updateTaskInfo);
  };

  const uploadFile = (e: any) => {
    const uploadData = new FormData();
    uploadData.append('photos', e.target.files[0]);
    upload(uploadData).then((res: any) => {
      uploadSuccess(res.data);
    });
  };

  if (!taskInfo) {
    return <div />;
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <CardHeader
          updateIsViewTask={updateIsViewTask}
          deleteTask={deleteTask}
          taskInfo={taskInfo}
        />
        <div className={styles.cardContent}>
          <CardLeftContent
            taskInfo={taskInfo}
            onSave={onSave}
            removeAttachment={removeAttachment}
            uploadFile={uploadFile}
          />
          <CardRightContent
            taskInfo={taskInfo}
            columnsInfo={columnsInfo}
            taskStatusOnchange={onSave}
            labels={labels}
          />
        </div>
      </div>
    </div>
  );
}
