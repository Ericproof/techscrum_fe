import React, { useEffect, useRef, useState } from 'react';
import { BiDotsHorizontal } from 'react-icons/bi';
import { GoPlus } from 'react-icons/go';
import Button from '../../../components/Button/Button';
import IconButton from '../../../components/Button/IconButton/IconButton';
import TaskTypeSelect from '../../../components/Select/TaskTypeSelect/TaskTypeSelect';
import TaskItem from '../TaskItem/TaskItem';
import styles from './SprintSection.module.scss';
// WIP more function will be added

export default function SprintSection() {
  const dummyTaskList = [
    {
      id: 'TEC-318',
      title: 'Task 1',
      type: 'Story',
      imgUrl:
        'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
      status: 'TO DO',
      priority: 'Highest'
    },
    {
      id: 'TEC-319',
      title: 'Task 2',
      type: 'Bug',
      imgUrl:
        'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium',
      status: 'TO DO',
      priority: 'Medium'
    },
    {
      id: 'TEC-320',
      title: 'Task 3',
      type: 'Task',
      imgUrl:
        'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
      status: 'TESTING',
      priority: 'Lowest'
    }
  ];
  const initialType = {
    type: 'story',
    imgUrl:
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium'
  };
  const [taskList, setTaskList] = useState(dummyTaskList);
  const [showSprintInput, setShowSprintInput] = useState(false);
  const [sprintInputFocus, setSprintInputFocus] = useState(false);
  const [currentTypeOption, setCurrentTypeOption] = useState(initialType);
  const sprintFormRef = useRef<HTMLFormElement | null>(null);
  const createIssueRef = useRef<HTMLInputElement | null>(null);

  const [editId, setEditId] = useState('-1');

  const getCurrentTypeOption = (option: { type: string; imgUrl: string }) => {
    setCurrentTypeOption(option);
  };
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (sprintInputFocus && !sprintFormRef.current?.contains(e.target)) {
        if (createIssueRef?.current?.value) {
          const id = 'TEC-'.concat(
            (+taskList[taskList.length - 1].id.split('-')[1] + 1).toString()
          );
          setTaskList([
            ...taskList,
            {
              id,
              title: createIssueRef?.current?.value,
              type: currentTypeOption.type,
              imgUrl: currentTypeOption.imgUrl,
              status: 'TO DO',
              priority: 'Medium'
            }
          ]);
          setCurrentTypeOption(initialType);
        }
        setShowSprintInput(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [currentTypeOption.imgUrl, currentTypeOption.type, initialType, sprintInputFocus, taskList]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(taskList);
  }, [taskList]);

  const onClickEditId = (id: string) => {
    setEditId(id);
  };
  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === event.target.id) {
        return {
          ...task,
          title: event.target.value
        };
      }
      return task;
    });
    setTaskList(updatedTaskList);
  };
  const onKeyDownCreateIssue = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (createIssueRef?.current?.value) {
        const id = 'TEC-'.concat((+taskList[taskList.length - 1].id.split('-')[1] + 1).toString());
        setTaskList([
          ...taskList,
          {
            id,
            title: createIssueRef?.current?.value,
            type: currentTypeOption.type,
            imgUrl: currentTypeOption.imgUrl,
            status: 'TO DO',
            priority: 'Medium'
          }
        ]);
        setCurrentTypeOption(initialType);
      }
      setShowSprintInput(false);
    }
  };
  const onClickChangeStatus = (id, status) => {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === id) {
        return { ...task, status };
      }
      return task;
    });
    setTaskList(updatedTaskList);
  };
  const onClickChangePriority = (id, priority) => {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === id) {
        return { ...task, priority };
      }
      return task;
    });
    setTaskList(updatedTaskList);
  };
  const onClickDelete = (id) => {
    const updatedTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(updatedTaskList);
  };
  return (
    <section className={[styles.container, styles.sprintContainer].join(' ')}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h1>Current Sprint</h1>
          <div className={styles.issueCount}>{taskList.length} issues</div>
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
              imgUrl={task.imgUrl}
              type={task.type}
              status={task.status}
              onClickChangeStatus={onClickChangeStatus}
              priority={task.priority}
              onClickChangePriority={onClickChangePriority}
              onClickDelete={onClickDelete}
            />
          );
        })}
      </div>
      {showSprintInput ? (
        <form ref={sprintFormRef}>
          <div className={styles.formField}>
            <TaskTypeSelect onChangeType={getCurrentTypeOption} />
            <input
              className={styles.input}
              type="text"
              name="newTask"
              id="newTask"
              onFocus={() => setSprintInputFocus(true)}
              onKeyDown={onKeyDownCreateIssue}
              ref={createIssueRef}
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
