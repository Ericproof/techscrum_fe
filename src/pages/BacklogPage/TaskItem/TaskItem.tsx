import React, { useEffect, useRef, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import IconButton from '../../../components/Button/IconButton/IconButton';
import styles from './TaskItem.module.scss';
import ToolBar from '../ToolBar/ToolBar';
import PriorityBtn from '../PriorityBtn/PriorityBtn';
import OptionBtn from '../OptionBtn/OptionBtn';
// WIP fixing click outside handle
interface ITaskInput {
  taskTitle: string;
  id: string;
  editMode: boolean;
  onClickEditId: (id: string) => void;
  onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imgUrl: string;
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
  imgUrl,
  type,
  status,
  onClickChangeStatus,
  priority,
  onClickChangePriority,
  onClickDelete
}: ITaskInput) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showOptionBtn, setShowOptionBtn] = useState(false);
  const [disableShowOptionBtnEffect, setDisableShowOptionBtnEffect] = useState(false);
  const editClick = () => {
    onClickEditId(id);
  };
  const updateTaskTitleContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeTitle(event);
  };

  const saveKeyPress = (event) => {
    if (event.key === 'Enter') {
      onClickEditId('-1');
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
          <img className={styles.icon} src={imgUrl} alt={type} />
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
            onChange={updateTaskTitleContent}
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
