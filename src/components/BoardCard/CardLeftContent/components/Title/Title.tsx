import React from 'react';
import { TaskEntity } from '../../../../../api/task/entity/task';
import styles from './Title.module.scss';

interface Props {
  taskInfo: TaskEntity;
}

export default function Title({ taskInfo }: Props) {
  return (
    <div className={styles.cardTitle}>
      <label htmlFor="title">
        <input type="text" id="title" name="title" defaultValue={taskInfo.title} />
      </label>
    </div>
  );
}
