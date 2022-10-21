import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FaPen } from 'react-icons/fa';
import IconButton from '../../../components/Button/IconButton/IconButton';
import styles from './TaskItem.module.scss';
import ToolBar from '../ToolBar/ToolBar';
import PriorityBtn from '../PriorityBtn/PriorityBtn';
import OptionBtn from '../OptionBtn/OptionBtn';

interface ITaskInput {
  taskTitle: string;
  id: string;
  editMode: boolean;
  onClickEditId: (id: string) => void;
  onChangeTitle: (id: string, title: string) => void;
  type: string;
  status: string;
  onClickChangeStatus: (id: string, status: string) => void;
  priority: string;
  onClickChangePriority: (id: string, priority: string) => void;
  onClickDelete: (id: string) => void;
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
  priority,
  onClickChangePriority,
  onClickDelete
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
    onClickEditId(id);
  };
  const updateTaskTitleContent = useCallback(() => {
    if (inputRef?.current?.value) {
      onChangeTitle(id, inputRef?.current?.value);
    }
  }, [id, onChangeTitle]);

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
            id={id}
            ref={inputRef}
            type="text"
            defaultValue={taskTitle}
            onKeyDown={saveKeyPress}
            className={styles.taskInput}
          />
        ) : (
          <div className={styles.taskTitle}>{taskTitle}</div>
        )}
        {!editMode && (
          <div className={styles.editButton}>
            <IconButton icon={<FaPen size={10} />} tooltip="Edit" onClick={editClick} />
          </div>
        )}
      </div>
      <PriorityBtn priority={priority} id={id} onClickChangePriority={onClickChangePriority} />
      <ToolBar status={status} id={id} onClickChangeStatus={onClickChangeStatus} />
      <OptionBtn
        showOptionBtn={showOptionBtn}
        id={id}
        onClickDelete={onClickDelete}
        toggleDisableShowOptionBtnEffect={toggleDisableShowOptionBtnEffect}
      />
    </div>
  );
}
