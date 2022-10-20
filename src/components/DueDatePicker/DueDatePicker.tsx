import React from 'react';
import { DatePicker } from '@atlaskit/datetime-picker';
import checkAccess from '../../utils/helpers';
import styles from './DueDatePicker.module.scss';
import { TaskEntity } from '../../api/task/entity/task';

interface Props {
  taskInfo: TaskEntity;
  dueDateOnchange: (taskInfo: TaskEntity) => void;
  projectId: string;
}

export default function DueDatePicker({ taskInfo, dueDateOnchange, projectId }: Props) {
  const dateWithDay = (d: Date | null) => {
    if (d != null) {
      const date = d.toString().split('T')[0];
      const dateDataArray = date.split('-');
      return `${dateDataArray[1]}-${dateDataArray[2]}-${dateDataArray[0]}`;
    }
    return '';
  };
  const editAccess = checkAccess('edit:tasks', projectId);
  return (
    <DatePicker
      dateFormat="MM-DD-YYYY"
      placeholder={dateWithDay(taskInfo.dueAt ?? null)}
      onChange={(date) => {
        const updatedTaskInfo = { ...taskInfo };
        updatedTaskInfo.dueAt = new Date(date);
        dueDateOnchange(updatedTaskInfo);
      }}
      isDisabled={!editAccess}
    />
  );
}
