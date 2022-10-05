import React, { useRef } from 'react';
import { FaPen } from 'react-icons/fa';
import IconButton from '../../../components/Button/IconButton/IconButton';
import styles from './TaskItem.module.scss';
import TaskTypeSelect from '../../../components/Select/TaskTypeSelect/TaskTypeSelect';
import ToolBar from '../ToolBar/ToolBar';
// WIP more function will be added
interface ITaskInput {
  taskTitle: string;
  id: string;
  editMode: boolean;
  onClickEditId: (id: string) => void;
  onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function TaskItem({
  taskTitle,
  id,
  editMode,
  onClickEditId,
  onChangeTitle
}: ITaskInput) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editClick = () => {
    onClickEditId(id);
  };
  const updateTaskTitleContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeTitle) {
      onChangeTitle(event);
    }
  };

  const saveKeyPress = (event) => {
    if (event.key === 'Enter') {
      onClickEditId('-1');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.taskInfo}>
        <TaskTypeSelect />
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
      <ToolBar />
    </div>
  );
}
