import React, { useState } from 'react';
import { FaChevronDown, FaPen } from 'react-icons/fa';
import { TaskEntity } from '../../../api/task/entity/task';
import IconButton from '../../../components/Button/IconButton/IconButton';
import styles from './TaskItem.module.scss';
import Button from '../../../components/Button/Button';
import Avartar from '../../../assets/userAvatar.png';
import TaskTypeSelect from '../../../components/Select/TypeSelect/TaskTypeSelect';

// WIP more function will be added
export default function TaskItem(props: TaskEntity) {
  const [taskType, setTaskType] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.taskInfo}>
        <TaskTypeSelect onChange={(e) => setTaskType(e)} />
        {/* <div className={styles.taskType}>TEC-328</div> */}
        <div className={styles.taskTitle}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, provident?
        </div>
        <div className={styles.editButton}>
          <IconButton icon={<FaPen size={10} />} tooltip="Edit" />
        </div>
      </div>

      <div className={styles.toolbar}>
        <Button icon={<FaChevronDown />} iconPosition="end" overrideStyle={styles.toDoButton}>
          TO DO
        </Button>
        <IconButton
          overrideStyle={styles.assignee}
          icon={<img src={Avartar} alt="avatar" />}
          tooltip="unassigned"
        />
      </div>
    </div>
  );
}
