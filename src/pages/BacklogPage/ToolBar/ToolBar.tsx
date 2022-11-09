import React from 'react';
import styles from './ToolBar.module.scss';
import Avartar from '../../../assets/userAvatar.png';
import IconButton from '../../../components/Button/IconButton/IconButton';
import StatusBtn from '../StatusBtn/StatusBtn';

interface IToolBar {
  status: string;
  onClickChangeStatus: (id: string, status: string) => void;
  taskId: string;
  statusData: any;
}
export default function ToolBar({ status, onClickChangeStatus, taskId, statusData }: IToolBar) {
  return (
    <div className={styles.toolbar}>
      <StatusBtn
        status={status}
        onClickChangeStatus={onClickChangeStatus}
        taskId={taskId}
        statusData={statusData}
      />
      <IconButton
        overrideStyle={styles.assignee}
        icon={<img src={Avartar} alt="avatar" />}
        tooltip="unassigned"
      />
    </div>
  );
}
