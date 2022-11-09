import React from 'react';
import styles from './ToolBar.module.scss';
import StatusBtn from '../StatusBtn/StatusBtn';
import AssigneeBtn from '../AssigneeBtn/AssigneeBtn';
import PriorityBtn from '../PriorityBtn/PriorityBtn';

interface IToolBar {
  status: string;
  onClickChangeStatus: (id: string, status: string) => void;
  taskId: string;
  onClickChangeAssignee: (id: string, assigneeId: string) => void;
  userList: any;
  assignee: any;
  priority: string;
  onClickChangePriority: (id: string, priority: string) => void;
}
export default function ToolBar({
  status,
  onClickChangeStatus,
  onClickChangeAssignee,
  userList,
  assignee,
  taskId,
  onClickChangePriority,
  priority
}: IToolBar) {
  return (
    <div className={styles.toolbar}>
      <PriorityBtn id={taskId} onClickChangePriority={onClickChangePriority} priority={priority} />
      <StatusBtn status={status} onClickChangeStatus={onClickChangeStatus} taskId={taskId} />
      <AssigneeBtn
        taskId={taskId}
        onClickChangeAssignee={onClickChangeAssignee}
        assignee={assignee}
        userList={userList}
      />
    </div>
  );
}
