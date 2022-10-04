import React, { useEffect, useRef, useState } from 'react';
import { BiDotsHorizontal } from 'react-icons/bi';
import { GoPlus } from 'react-icons/go';
import Button from '../../../components/Button/Button';
import IconButton from '../../../components/Button/IconButton/IconButton';
import TaskTypeSelect from '../../../components/Select/TaskTypeSelect/TaskTypeSelect';
import TaskItem from '../TaskItem/TaskItem';
import styles from './SprintSection.module.scss';

export default function SprintSection() {
  const [showSprintInput, setShowSprintInput] = useState(false);
  const [sprintInputFocus, setSprintInputFocus] = useState(false);
  const sprintFormRef = useRef<HTMLFormElement | null>(null);

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

  return (
    <section className={[styles.container, styles.sprintContainer].join(' ')}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h1>Current Sprint</h1>
          <div className={styles.issueCount}>number of issues</div>
        </div>
        <div className={styles.toolbar}>
          <Button>Create sprint</Button>
          <IconButton icon={<BiDotsHorizontal />} tooltip="actions" />
        </div>
      </div>
      <div className={styles.listContainer}>
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
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
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
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
