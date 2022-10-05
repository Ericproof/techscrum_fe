import React, { useEffect, useRef, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import Button from '../../../components/Button/Button';
import TaskTypeSelect from '../../../components/Select/TaskTypeSelect/TaskTypeSelect';
import TaskItem from '../TaskItem/TaskItem';
import styles from './BacklogSection.module.scss';

export default function BacklogSection() {
  const dummyTaskList = [
    { id: '1', title: 'Task 1' },
    { id: '2', title: 'Task 2' },
    { id: '3', title: 'Task 3' }
  ];
  const [showBacklogInput, setShowBacklogInput] = useState(false);
  const [backlogInputFocus, setBacklogInputFocus] = useState(false);
  const [editId, setEditId] = useState('0');
  const [taskList, setTaskList] = useState(dummyTaskList);

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
