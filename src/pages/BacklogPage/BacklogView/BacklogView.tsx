import React, { useEffect, useRef, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { BiDotsHorizontal } from 'react-icons/bi';
import DashboardLayout from '../../../components/DashboardLayout/DashboardLayout';
import IconButton from '../../../components/Button/IconButton/IconButton';
import TaskItem from '../TaskItem/TaskItem';
import styles from './BacklogView.module.scss';
import Button from '../../../components/Button/Button';
import TaskTypeIcon from '../TaskTypeIcon/TaskTypeIcon';

export default function BacklogView() {
  const [showSprintInput, setSprintInput] = useState(false);
  const [showBacklogInput, setShowBacklogInput] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <DashboardLayout>
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
        {showSprintInput && (
          <form ref={formRef}>
            <div className={styles.formField}>
              <span>
                <TaskTypeIcon storyType="story" />
              </span>
              {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
              <input className={styles.input} type="text" name="newTask" id="newTask" autoFocus />
            </div>
          </form>
        )}
        <Button
          icon={<GoPlus />}
          overrideStyle={styles.buttonRow}
          onClick={() => setSprintInput(true)}
        >
          Create issue
        </Button>
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
        {showBacklogInput && (
          <form ref={formRef}>
            <div className={styles.formField}>
              <span>
                <TaskTypeIcon storyType="story" />
              </span>
              <input
                className={styles.input}
                type="text"
                name="newBacklog"
                id="newBacklog"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
            </div>
          </form>
        )}
        <Button
          icon={<GoPlus />}
          overrideStyle={styles.buttonRow}
          onClick={() => setShowBacklogInput(true)}
        >
          Create issue
        </Button>
      </section>
    </DashboardLayout>
  );
}
