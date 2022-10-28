import React from 'react';
import styles from './ToolBar.module.scss';
import Avartar from '../../../assets/userAvatar.png';
import IconButton from '../../../components/Button/IconButton/IconButton';
import StatusBtn from '../StatusBtn/StatusBtn';

interface IToolBar {
  status: string;
  onClickChangeStatus: (id: string, status: string) => void;
  taskId: string;
}
export default function ToolBar({ status, onClickChangeStatus, taskId }: IToolBar) {
  return (
    <div className={styles.toolbar}>
      <StatusBtn status={status} onClickChangeStatus={onClickChangeStatus} taskId={taskId} />
      <IconButton
        overrideStyle={styles.assignee}
        icon={<img src={Avartar} alt="avatar" />}
        tooltip="unassigned"
      />
    </div>
  );
}
