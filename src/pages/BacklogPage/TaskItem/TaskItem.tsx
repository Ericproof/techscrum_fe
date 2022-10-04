import React from 'react';
import { FaChevronDown, FaPen } from 'react-icons/fa';
import IconButton from '../../../components/Button/IconButton/IconButton';
import styles from './TaskItem.module.scss';
import Button from '../../../components/Button/Button';
import Avartar from '../../../assets/userAvatar.png';
import TaskTypeSelect from '../../../components/Select/TaskTypeSelect/TaskTypeSelect';

// WIP more function will be added
export default function TaskItem() {
  return (
    <div className={styles.container}>
      <div className={styles.taskInfo}>
        <TaskTypeSelect />
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
