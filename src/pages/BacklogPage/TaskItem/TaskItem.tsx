import React, { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import IconButton from '../../../components/Button/IconButton/IconButton';
import styles from './TaskItem.module.scss';
import OptionBtn from '../OptionBtn/OptionBtn';
import { IUserInfo, IStatusBacklog } from '../../../types';
import PriorityBtn from '../PriorityBtn/PriorityBtn';
import StatusBtn from '../StatusBtn/StatusBtn';
import AssigneeBtn from '../AssigneeBtn/AssigneeBtn';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import { updateTask } from '../../../api/backlog/backlog';

interface ITaskInput {
  task: any;
  statusData: IStatusBacklog[];
  userList: IUserInfo[];
  sprintData?: any;
  showDropDownOnTop?: boolean;
  getBacklogDataApi: () => void;
  projectKey: string;
}
export default function TaskItem({
  task,
  statusData,
  userList,
  sprintData,
  showDropDownOnTop,
  getBacklogDataApi,
  projectKey
}: ITaskInput) {
  const allTypes = {
    story:
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
    bug: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium',
    task: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium'
  };
  const [showOptionBtn, setShowOptionBtn] = useState(false);
  const [disableShowOptionBtnEffect, setDisableShowOptionBtnEffect] = useState(false);
  const [title, setTitle] = useState(task.title);

  const updateTaskTitleContent = () => {
    if (title.trim() !== task.title) {
      const data = { title: title.trim() };
      updateTask(task.id, data)
        .then(() => {
          getBacklogDataApi();
        })
        .catch(() => {
          toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
        });
    }
  };

  const { visible, setVisible, myRef } = useOutsideAlerter(false);

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
      data-testid={'task-hover-'.concat(task.id)}
      ref={myRef}
    >
      <div className={styles.taskInfo}>
        <div className={styles.iconContainer}>
          <img className={styles.icon} src={allTypes[task.typeId.slug]} alt={task.typeId.slug} />
        </div>
        <div className={styles.taskIdContainer}>
          <p>{`${projectKey}-${task.id.slice(task.id.length - 3)}`}</p>
        </div>
        {visible ? (
          <input
            type="text"
            defaultValue={task.title}
            onKeyDown={saveKeyPress}
            className={styles.taskInput}
            data-testid={'task-title-input-'.concat(task.id)}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <div className={styles.taskTitle} data-testid={'task-'.concat(task.id)}>
            {task.title}
          </div>
        )}
        {!visible && (
          <div className={styles.editButton}>
            <IconButton
              icon={<FaPen size={10} />}
              taskId={task.id}
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
          showDropDownOnTop={showDropDownOnTop}
          taskId={task.id}
          priority={task.priority}
          getBacklogDataApi={getBacklogDataApi}
        />
        <StatusBtn
          status={task.status.name.toUpperCase()}
          taskId={task.id}
          statusData={statusData}
          showDropDownOnTop={showDropDownOnTop}
          getBacklogDataApi={getBacklogDataApi}
        />
        <AssigneeBtn
          taskId={task.id}
          assignee={task.assignId}
          userList={userList}
          showDropDownOnTop={showDropDownOnTop}
          getBacklogDataApi={getBacklogDataApi}
        />
        <OptionBtn
          taskId={task.id}
          showOptionBtn={showOptionBtn}
          toggleDisableShowOptionBtnEffect={toggleDisableShowOptionBtnEffect}
          sprintId={task.sprintId}
          sprintData={sprintData}
          showDropDownOnTop={showDropDownOnTop}
          getBacklogDataApi={getBacklogDataApi}
        />
      </div>
    </div>
  );
}
TaskItem.defaultProps = {
  showDropDownOnTop: false,
  sprintData: []
};
