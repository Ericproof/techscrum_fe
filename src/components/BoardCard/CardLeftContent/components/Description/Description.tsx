import React from 'react';
import { TaskEntity } from '../../../../../api/task/entity/task';
import checkAccess from '../../../../../utils/helpers';
import style from './Description.module.scss';

interface Props {
  taskInfo: TaskEntity;
  focusEventHandler: () => void;
  isDisabled: boolean;
}

export default function Description({ taskInfo, focusEventHandler, isDisabled }: Props) {
  return (
    <div className={style.container}>
      <h2 className={style.description}>Description</h2>
      <textarea
        name="description"
        id="description"
        cols={80}
        rows={23}
        placeholder="Add a description..."
        defaultValue={taskInfo.description}
        onFocus={focusEventHandler}
        disabled={isDisabled}
      />
    </div>
  );
}
