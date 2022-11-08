import React from 'react';
import styles from './ToolBar.module.scss';
import Avartar from '../../../assets/userAvatar.png';
import IconButton from '../../../components/Button/IconButton/IconButton';
import StatusBtn from '../StatusBtn/StatusBtn';
import PriorityBtn from '../PriorityBtn/PriorityBtn';

interface IToolBar {
  status: string;
  onClickChangeStatus: (id: string, status: string) => void;
  taskId: string;
  priority: string;
  onClickChangePriority: (id: string, priority: string) => void;
}
export default function ToolBar({
  status,
  onClickChangeStatus,
  taskId,
  onClickChangePriority,
  priority
}: IToolBar) {
  return (
    <div className={styles.toolbar}>
      <PriorityBtn id={taskId} onClickChangePriority={onClickChangePriority} priority={priority} />
      <StatusBtn status={status} onClickChangeStatus={onClickChangeStatus} taskId={taskId} />
      <IconButton
        overrideStyle={styles.assignee}
        icon={<img src={Avartar} alt="avatar" />}
        tooltip="unassigned"
      />
    </div>
  );
}
