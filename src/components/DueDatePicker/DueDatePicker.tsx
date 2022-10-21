import React from 'react';
import { DatePicker } from '@atlaskit/datetime-picker';
import { TaskEntity } from '../../api/task/entity/task';

interface Props {
  taskInfo: TaskEntity;
  dueDateOnchange: (taskInfo: TaskEntity) => void;
  isDisabled: boolean;
}

export default function DueDatePicker({ taskInfo, dueDateOnchange, isDisabled }: Props) {
  const dateWithDay = (date: Date | null) => {
    if (date != null) {
      const fullDate = date.toString().split('T')[0];
      const dateDataArray = fullDate.split('-');
      return `${dateDataArray[1]}-${dateDataArray[2]}-${dateDataArray[0]}`;
    }
    return '';
  };

  return (
    <DatePicker
      appearance="subtle"
      dateFormat="MM-DD-YYYY"
      placeholder={dateWithDay(taskInfo.dueAt ?? null)}
      onChange={(date) => {
        const updatedTaskInfo = { ...taskInfo };
        updatedTaskInfo.dueAt = new Date(date);
        dueDateOnchange(updatedTaskInfo);
      }}
      isDisabled={!isDisabled}
    />
  );
}
