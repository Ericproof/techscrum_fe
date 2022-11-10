import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FaPen } from 'react-icons/fa';
import IconButton from '../../../components/Button/IconButton/IconButton';
import styles from './TaskItem.module.scss';
import ToolBar from '../ToolBar/ToolBar';
import OptionBtn from '../OptionBtn/OptionBtn';
import { IUserInfo, IAssign, IStatusBacklog } from '../../../types';

interface ITaskInput {
  taskTitle: string;
  id: string;
  editMode: boolean;
  onClickEditId: (id: string) => void;
  onChangeTitle: (id: string, title: string) => void;
  type: string;
  status: string;
  taskId: string;
  onClickChangeStatus: (id: string, statusId: string) => void;
  onClickDelete: (id: string) => void;
  statusData: IStatusBacklog[];
  onClickChangeAssignee: (id: string, assigneeId: string) => void;
  userList: IUserInfo[];
  assignee: IAssign | null;
  priority: string;
  onClickChangePriority: (id: string, priority: string) => void;
}
export default function TaskItem({
  taskTitle,
  id,
  editMode,
  onClickEditId,
  onChangeTitle,
  type,
  status,
  onClickChangeStatus,
  taskId,
  onClickDelete,
  statusData,
  onClickChangeAssignee,
  userList,
  assignee,
  priority,
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
          <p>{id}</p>
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
      <ToolBar
        status={status}
        taskId={taskId}
        onClickChangeStatus={onClickChangeStatus}
        statusData={statusData}
        onClickChangeAssignee={onClickChangeAssignee}
        userList={userList}
        assignee={assignee}
        priority={priority}
        onClickChangePriority={onClickChangePriority}
      />
      <OptionBtn
        showOptionBtn={showOptionBtn}
        taskId={taskId}
        onClickDelete={onClickDelete}
        toggleDisableShowOptionBtnEffect={toggleDisableShowOptionBtnEffect}
      />
    </div>
  );
}
