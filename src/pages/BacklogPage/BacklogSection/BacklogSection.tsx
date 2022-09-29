import React, { useEffect, useRef, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import Button from '../../../components/Button/Button';
import TaskTypeSelect from '../../../components/Select/TaskTypeSelect/TaskTypeSelect';
import TaskItem from '../TaskItem/TaskItem';
import styles from './BacklogSection.module.scss';

export default function BacklogSection() {
  const [showBacklogInput, setShowBacklogInput] = useState(false);
  const [backlogInputFocus, setBacklogInputFocus] = useState(false);

  const backlogFormRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (backlogInputFocus && !backlogFormRef.current?.contains(e.target)) {
        setShowBacklogInput(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [backlogInputFocus]);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h1>Backlog</h1>
          <div className={styles.issueCount}>number of issues</div>
        </div>
        <div className={styles.toolbar}>
          <Button>Create sprint</Button>
        </div>
      </div>
      <div className={styles.listContainer}>
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
      </div>
      {showBacklogInput ? (
        <form ref={backlogFormRef}>
          <div className={styles.formField}>
            <TaskTypeSelect />
            <input
              className={styles.input}
              type="text"
              name="newBacklog"
              id="newBacklog"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              onFocus={() => {
                setBacklogInputFocus(true);
              }}
            />
          </div>
        </form>
      ) : (
        <Button
          icon={<GoPlus />}
          overrideStyle={styles.buttonRow}
          onClick={() => setShowBacklogInput(true)}
        >
          Create issue
        </Button>
      )}
    </section>
  );
}
