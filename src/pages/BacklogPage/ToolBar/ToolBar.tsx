import React from 'react';
import styles from './ToolBar.module.scss';
import StatusBtn from '../StatusBtn/StatusBtn';
import AssigneeBtn from '../AssigneeBtn/AssigneeBtn';

interface IToolBar {
  status: string;
  onClickChangeStatus: (id: string, status: string) => void;
  taskId: string;
  onClickChangeAssignee: (id: string, assigneeId: string) => void;
  userList: any;
  assignee: any;
}
export default function ToolBar({
  status,
  onClickChangeStatus,
  onClickChangeAssignee,
  taskId,
  userList,
  assignee
}: IToolBar) {
  return (
    <div className={styles.toolbar}>
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
