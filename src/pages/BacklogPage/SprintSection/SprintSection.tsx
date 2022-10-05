import React, { useEffect, useRef, useState } from 'react';
import { BiDotsHorizontal } from 'react-icons/bi';
import { GoPlus } from 'react-icons/go';
import Button from '../../../components/Button/Button';
import IconButton from '../../../components/Button/IconButton/IconButton';
import TaskTypeSelect from '../../../components/Select/TaskTypeSelect/TaskTypeSelect';
import TaskItem from '../TaskItem/TaskItem';
import styles from './SprintSection.module.scss';

export default function SprintSection() {
  const dummyTaskList = [
    { id: '1', title: 'Task 1' },
    { id: '2', title: 'Task 2' },
    { id: '3', title: 'Task 3' }
  ];
  const [taskList, setTaskList] = useState(dummyTaskList);
  const [showSprintInput, setShowSprintInput] = useState(false);
  const [sprintInputFocus, setSprintInputFocus] = useState(false);
  const sprintFormRef = useRef<HTMLFormElement | null>(null);
  const [editId, setEditId] = useState('-1');

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (sprintInputFocus && !sprintFormRef.current?.contains(e.target)) {
        setShowSprintInput(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sprintInputFocus]);
  const onClickEditId = (id: string) => {
    setEditId(id);
  };
  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === event.target.id) {
        return { id: task.id, title: event.target.value };
      }
      return { id: task.id, title: task.title };
    });
    setTaskList(updatedTaskList);
  };

  return (
    <section className={[styles.container, styles.sprintContainer].join(' ')}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h1>Current Sprint</h1>
          <div className={styles.issueCount}>number of issues</div>
        </div>
        <div className={styles.toolbar}>
          <Button>Create sprint</Button>
          <IconButton icon={<BiDotsHorizontal />} tooltip="actions" onClick={undefined} />
        </div>
      </div>
      <div className={styles.listContainer}>
        {taskList.map((task) => {
          return (
            <TaskItem
              taskTitle={task.title}
              key={task.id}
              id={task.id}
              editMode={editId === task.id}
              onClickEditId={onClickEditId}
              onChangeTitle={onChangeTitle}
            />
          );
        })}
      </div>
      {showSprintInput ? (
        <form ref={sprintFormRef}>
          <div className={styles.formField}>
            <TaskTypeSelect />
            <input
              className={styles.input}
              type="text"
              name="newTask"
              id="newTask"
              onFocus={() => setSprintInputFocus(true)}
            />
          </div>
        </form>
      ) : (
        <Button
          icon={<GoPlus />}
          overrideStyle={styles.buttonRow}
          onClick={() => setShowSprintInput(true)}
        >
          Create issue
        </Button>
      )}
    </section>
  );
}
