import React from 'react';
import styles from './ToolBar.module.scss';
import StatusBtn from '../StatusBtn/StatusBtn';
import AssigneeBtn from '../AssigneeBtn/AssigneeBtn';
import PriorityBtn from '../PriorityBtn/PriorityBtn';
import { IUserInfo, IAssign } from '../../../types';

interface IToolBar {
  status: string;
  onClickChangeStatus: (id: string, statusId: string) => void;
  taskId: string;
  statusData: any;
  onClickChangeAssignee: (id: string, assigneeId: string) => void;
  userList: IUserInfo[];
  assignee: IAssign | null;
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
  priority,
  statusData
}: IToolBar) {
  return (
    <div className={styles.toolbar}>
      <PriorityBtn id={taskId} onClickChangePriority={onClickChangePriority} priority={priority} />
      <StatusBtn
        status={status}
        onClickChangeStatus={onClickChangeStatus}
        taskId={taskId}
        statusData={statusData}
      />
      <AssigneeBtn
        taskId={taskId}
        onClickChangeAssignee={onClickChangeAssignee}
        assignee={assignee}
        userList={userList}
      />
    </div>
  );
}
