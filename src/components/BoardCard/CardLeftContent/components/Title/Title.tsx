import React from 'react';
import { TaskEntity } from '../../../../../api/task/entity/task';
import styles from './Title.module.scss';

interface Props {
  taskInfo: TaskEntity;
  focusEventHandler: () => void;
}

export default function Title({ taskInfo, focusEventHandler }: Props) {
  return (
    <div className={styles.cardTitle}>
      <label htmlFor="title">
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={taskInfo.title}
          onFocus={focusEventHandler}
        />
      </label>
    </div>
  );
}
