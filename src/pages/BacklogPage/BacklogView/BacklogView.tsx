import React, { useEffect, useRef, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { BiDotsHorizontal } from 'react-icons/bi';
import DashboardLayout from '../../../components/DashboardLayout/DashboardLayout';
import IconButton from '../../../components/Button/IconButton/IconButton';
import TaskItem from '../TaskItem/TaskItem';
import styles from './BacklogView.module.scss';
import Button from '../../../components/Button/Button';
import TaskTypeSelect from '../../../components/Select/TypeSelect/TaskTypeSelect';

// WIP more function will be added after backend is complete
export default function BacklogView() {
  const [showSprintInput, setShowSprintInput] = useState(false);
  const [showBacklogInput, setShowBacklogInput] = useState(false);
  const [sprintInputFocus, setSprintInputFocus] = useState(false);
  const [backlogInputFocus, setBacklogInputFocus] = useState(false);
  const sprintFormRef = useRef<HTMLFormElement | null>(null);
  const backlogFormRef = useRef<HTMLFormElement | null>(null);

  const [sprintType, setSprintType] = useState('');
  const [backlogType, setBacklogType] = useState('');

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (sprintInputFocus && !sprintFormRef.current?.contains(e.target)) {
        setShowSprintInput(false);
      }
      if (backlogInputFocus && !backlogFormRef.current?.contains(e.target)) {
        setShowBacklogInput(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [backlogInputFocus, sprintInputFocus]);

  return (
    <DashboardLayout>
      <div>
        <h1>Backlog</h1>
      </div>
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
              <TaskTypeSelect onChange={setSprintType} />
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
              <TaskTypeSelect onChange={setBacklogType} />
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
    </DashboardLayout>
  );
}
