import React from 'react';
import { ImAttachment } from 'react-icons/im';
import { TaskEntity } from '../../../api/task/entity/task';
import style from './CardLeftContent.module.scss';
import Description from './components/Description/Description';
import LeftBottom from './components/LeftBottom/LeftBottom';

interface Props {
  taskInfo: TaskEntity;
}

export default function CardLeftContent({ taskInfo }: Props) {
  return (
    <div className={style.container}>
      <div className={style.cardTitle}>
        <h1>{taskInfo.title}</h1>
      </div>
      <div className={style.attachButton}>
        <label htmlFor="uploadPhoto">
          <ImAttachment className={style.attachIcon} />
          <span>Attach</span>
          <input id="uploadPhoto" type="file" name="Upload a photo" />
        </label>
      </div>
      <Description taskInfo={taskInfo} />
      <LeftBottom />
    </div>
  );
}
