import React from 'react';
import { FaChevronDown, FaPen } from 'react-icons/fa';
import TaskTypeIcon from '../TaskTypeIcon/TaskTypeIcon';
import { TaskEntity } from '../../../api/task/entity/task';
import IconButton from '../../../components/Button/IconButton/IconButton';
import styles from './TaskItem.module.scss';
import Button from '../../../components/Button/Button';
import Avartar from '../../../assets/userAvatar.png';

export default function TaskItem(props: TaskEntity) {
  return (
    <div className={styles.container}>
      <div className={styles.taskInfo}>
        <TaskTypeIcon storyType="story" />
        <div className={styles.taskType}>TEC-328</div>
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
