import React, { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import IconButton from '../../../components/Button/IconButton/IconButton';
import styles from './TaskItem.module.scss';
import OptionBtn from '../OptionBtn/OptionBtn';
import { IUserInfo, IAssign, IStatusBacklog } from '../../../types';
import PriorityBtn from '../PriorityBtn/PriorityBtn';
import StatusBtn from '../StatusBtn/StatusBtn';
import AssigneeBtn from '../AssigneeBtn/AssigneeBtn';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';

interface ITaskInput {
  taskTitle: string;
  issueId: string;
  type: string;
  status: string;
  taskId: string;
  statusData: IStatusBacklog[];
  userList: IUserInfo[];
  assignee: IAssign | null;
  priority: string;
  sprintId: string;
  sprintData?: any;
  showDropDownOnTop?: boolean;
  onChangeTitle: (id: string, title: string) => void;
  onClickChangeAssignee: (id: string, assigneeId: string) => void;
  onClickChangeStatus: (id: string, statusId: string) => void;
  onClickDelete: (id: string) => void;
  onClickChangePriority: (id: string, priority: string) => void;
  onClickAddToBacklog?: (id: string) => void;
  onClickAddToSprint?: (taskId: string, sprintId: string) => void;
}
export default function TaskItem({
  taskTitle,
  issueId,
  type,
  status,
  taskId,
  statusData,
  userList,
  assignee,
  priority,
  sprintId,
  sprintData,
  showDropDownOnTop,
  onChangeTitle,
  onClickChangeAssignee,
  onClickChangeStatus,
  onClickDelete,
  onClickChangePriority,
  onClickAddToBacklog,
  onClickAddToSprint
}: ITaskInput) {
  const allTypes = {
    story:
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
    bug: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium',
    task: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium'
  };
  const [showOptionBtn, setShowOptionBtn] = useState(false);
  const [disableShowOptionBtnEffect, setDisableShowOptionBtnEffect] = useState(false);
  const [title, setTitle] = useState(taskTitle);

  const updateTaskTitleContent = () => {
    if (title.trim() !== taskTitle) {
      onChangeTitle(taskId, title.trim());
    }
  };

  const { visible, setVisible, myRef } = useOutsideAlerter(false, updateTaskTitleContent);

  const saveKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateTaskTitleContent();
      setVisible(false);
    }
  };
  const mouseOver = () => {
    if (!disableShowOptionBtnEffect) {
      setShowOptionBtn(true);
    }
  };
  const mouseOut = () => {
    if (!disableShowOptionBtnEffect) {
      setShowOptionBtn(false);
    }
  };
  const toggleDisableShowOptionBtnEffect = () => {
    if (!disableShowOptionBtnEffect) {
      setDisableShowOptionBtnEffect(true);
    } else {
      setDisableShowOptionBtnEffect(false);
      setShowOptionBtn(false);
    }
  };
  return (
    <div
      className={styles.container}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
      onFocus={() => {}}
      onBlur={() => {}}
      data-testid={'task-hover-'.concat(taskId)}
      ref={myRef}
    >
      <div className={styles.taskInfo}>
        <div className={styles.iconContainer}>
          <img className={styles.icon} src={allTypes[type]} alt={type} />
        </div>
        <div className={styles.taskIdContainer}>
          <p>{issueId}</p>
        </div>
        {visible ? (
          <input
            type="text"
            defaultValue={taskTitle}
            onKeyDown={saveKeyPress}
            className={styles.taskInput}
            data-testid={'task-title-input-'.concat(taskId)}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <div className={styles.taskTitle} data-testid={'task-'.concat(taskId)}>
            {taskTitle}
          </div>
        )}
        {!visible && (
          <div className={styles.editButton}>
            <IconButton
              icon={<FaPen size={10} />}
              taskId={taskId}
              tooltip="Edit"
              onClick={() => {
                setVisible(true);
              }}
            />
          </div>
        )}
      </div>
      <div className={styles.toolBar}>
        <PriorityBtn
          taskId={taskId}
          priority={priority}
          showDropDownOnTop={showDropDownOnTop}
          onClickChangePriority={onClickChangePriority}
        />
        <StatusBtn
          status={status}
          taskId={taskId}
          statusData={statusData}
          showDropDownOnTop={showDropDownOnTop}
          onClickChangeStatus={onClickChangeStatus}
        />
        <AssigneeBtn
          taskId={taskId}
          assignee={assignee}
          userList={userList}
          showDropDownOnTop={showDropDownOnTop}
          onClickChangeAssignee={onClickChangeAssignee}
        />
        <OptionBtn
          taskId={taskId}
          showOptionBtn={showOptionBtn}
          onClickDelete={onClickDelete}
          toggleDisableShowOptionBtnEffect={toggleDisableShowOptionBtnEffect}
          sprintId={sprintId}
          onClickAddToBacklog={onClickAddToBacklog}
          onClickAddToSprint={onClickAddToSprint}
          sprintData={sprintData}
          showDropDownOnTop={showDropDownOnTop}
        />
      </div>
    </div>
  );
}
TaskItem.defaultProps = {
  onClickAddToBacklog: () => {},
  onClickAddToSprint: () => {},
  showDropDownOnTop: false,
  sprintData: []
};
