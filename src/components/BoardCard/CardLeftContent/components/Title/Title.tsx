import React from 'react';
import { TaskEntity } from '../../../../../api/task/entity/task';
import styles from './Title.module.scss';

interface Props {
  taskInfo: TaskEntity;
  focusEventHandler: () => void;
  isDisabled: boolean;
}

export default function Title({ taskInfo, focusEventHandler, isDisabled }: Props) {
  return (
    <div className={styles.cardTitle}>
      <label htmlFor="title">
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={taskInfo.title}
          onFocus={focusEventHandler}
          disabled={isDisabled}
        />
      </label>
    </div>
  );
}
