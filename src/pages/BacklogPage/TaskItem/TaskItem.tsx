import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FaPen } from 'react-icons/fa';
import IconButton from '../../../components/Button/IconButton/IconButton';
import styles from './TaskItem.module.scss';
import OptionBtn from '../OptionBtn/OptionBtn';
import { IUserInfo, IAssign, IStatusBacklog } from '../../../types';
import PriorityBtn from '../PriorityBtn/PriorityBtn';
import StatusBtn from '../StatusBtn/StatusBtn';
import AssigneeBtn from '../AssigneeBtn/AssigneeBtn';

interface ITaskInput {
  taskTitle: string;
  issueId: string;
  editMode: boolean;
  type: string;
  status: string;
  taskId: string;
  statusData: IStatusBacklog[];
  userList: IUserInfo[];
  assignee: IAssign | null;
  priority: string;
  onClickEditId: (id: string) => void;
  onChangeTitle: (id: string, title: string) => void;
  onClickChangeAssignee: (id: string, assigneeId: string) => void;
  onClickChangeStatus: (id: string, statusId: string) => void;
  onClickDelete: (id: string) => void;
  onClickChangePriority: (id: string, priority: string) => void;
}
export default function TaskItem({
  taskTitle,
  issueId,
  editMode,
  type,
  status,
  taskId,
  statusData,
  userList,
  assignee,
  priority,
  onClickEditId,
  onChangeTitle,
  onClickChangeAssignee,
  onClickChangeStatus,
  onClickDelete,
  onClickChangePriority
}: ITaskInput) {
  const allTypes = {
    story:
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
    bug: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium',
    task: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium'
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showOptionBtn, setShowOptionBtn] = useState(false);
  const [disableShowOptionBtnEffect, setDisableShowOptionBtnEffect] = useState(false);

  const editClick = () => {
    onClickEditId(taskId);
  };
  const updateTaskTitleContent = useCallback(() => {
    if (inputRef?.current?.value) {
      onChangeTitle(taskId, inputRef?.current?.value);
    }
  }, [taskId, onChangeTitle]);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (editMode && !inputRef.current?.contains(e.target)) {
        onClickEditId('-1');
        updateTaskTitleContent();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editMode, onClickEditId, updateTaskTitleContent]);

  const saveKeyPress = (event) => {
    if (event.key === 'Enter') {
      onClickEditId('-1');
      updateTaskTitleContent();
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
    >
      <div className={styles.taskInfo}>
        <div className={styles.iconContainer}>
          <img className={styles.icon} src={allTypes[type]} alt={type} />
        </div>
        <div className={styles.taskIdContainer}>
          <p>{issueId}</p>
        </div>
        {editMode ? (
          <input
            ref={inputRef}
            type="text"
            defaultValue={taskTitle}
            onKeyDown={saveKeyPress}
            className={styles.taskInput}
            data-testid={'task-title-input-'.concat(taskId)}
          />
        ) : (
          <div className={styles.taskTitle} data-testid={'task-'.concat(taskId)}>
            {taskTitle}
          </div>
        )}
        {!editMode && (
          <div className={styles.editButton}>
            <IconButton
              icon={<FaPen size={10} />}
              taskId={taskId}
              tooltip="Edit"
              onClick={editClick}
            />
          </div>
        )}
      </div>
      <div className={styles.toolBar}>
        <PriorityBtn
          taskId={taskId}
          priority={priority}
          onClickChangePriority={onClickChangePriority}
        />
        <StatusBtn
          status={status}
          taskId={taskId}
          statusData={statusData}
          onClickChangeStatus={onClickChangeStatus}
        />
        <AssigneeBtn
          taskId={taskId}
          assignee={assignee}
          userList={userList}
          onClickChangeAssignee={onClickChangeAssignee}
        />
        <OptionBtn
          taskId={taskId}
          showOptionBtn={showOptionBtn}
          onClickDelete={onClickDelete}
          toggleDisableShowOptionBtnEffect={toggleDisableShowOptionBtnEffect}
        />
      </div>
    </div>
  );
}
