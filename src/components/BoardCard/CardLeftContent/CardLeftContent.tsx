import React from 'react';
import { TaskEntity } from '../../../api/task/entity/task';
import style from './CardLeftContent.module.scss';
import Attach from './components/Attach/Attach';
import Description from './components/Description/Description';
import LeftBottom from './components/LeftBottom/LeftBottom';
import Title from './components/Title/Title';

interface Props {
  taskInfo: TaskEntity;
  onSave: (updatedTaskInfo: TaskEntity) => void;
}

export default function CardLeftContent({ taskInfo, onSave }: Props) {
  const onSaveProcessing = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const title = (form[0] as HTMLInputElement).value;
    const description = (form[2] as HTMLTextAreaElement).value;
    const updatedTaskInfo = { ...taskInfo, title, description };
    onSave(updatedTaskInfo);
  };
  return (
    <div className={style.container}>
      <form onSubmit={onSaveProcessing} id="task-form">
        <Title taskInfo={taskInfo} />
        <Attach />
        <Description taskInfo={taskInfo} />
        <div className={style.footerContent}>
          <button className={style.saveButton} type="submit">
            <span>Save</span>
          </button>
          <button className={style.cancelButton} type="button">
            <span>Cancel</span>
          </button>
        </div>
        <LeftBottom />
      </form>
    </div>
  );
}
