import React, { useEffect, useRef, useState, useCallback } from 'react';
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
  const [sprintTaskList, setSprintTaskList] = useState(dummyTaskList);
  const [showSprintInput, setShowSprintInput] = useState(false);
  const [sprintInputFocus, setSprintInputFocus] = useState(false);
  const [currentTypeOption, setCurrentTypeOption] = useState(initialType);
  const sprintFormRef = useRef<HTMLFormElement | null>(null);
  const createIssueRef = useRef<HTMLInputElement | null>(null);

  const [editId, setEditId] = useState('-1');

  const getCurrentTypeOption = (option: { type: string; imgUrl: string }) => {
    setCurrentTypeOption(option);
  };
  const createIssueAction = useCallback(() => {
    if (createIssueRef?.current?.value) {
      const id = 'TEC-'.concat(
        (+sprintTaskList[sprintTaskList.length - 1].id.split('-')[1] + 1).toString()
      );
      setSprintTaskList([
        ...sprintTaskList,
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
  }, [currentTypeOption.imgUrl, currentTypeOption.type, initialType, sprintTaskList]);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (sprintInputFocus && !sprintFormRef.current?.contains(e.target)) {
        createIssueAction();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [
    createIssueAction,
    currentTypeOption.imgUrl,
    currentTypeOption.type,
    initialType,
    sprintInputFocus,
    sprintTaskList
  ]);

  const onClickEditId = (id: string) => {
    setEditId(id);
  };
  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTaskList = sprintTaskList.map((task) => {
      if (task.id === event.target.id) {
        return {
          ...task,
          title: event.target.value
        };
      }
      return task;
    });
    setSprintTaskList(updatedTaskList);
  };

  const onKeyDownCreateIssue = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createIssueAction();
    }
  };
  const onClickChangeStatus = (id: string, status: string) => {
    const updatedTaskList = sprintTaskList.map((task) => {
      if (task.id === id) {
        return { ...task, status };
      }
      return task;
    });
    setSprintTaskList(updatedTaskList);
  };
  const onClickChangePriority = (id: string, priority: string) => {
    const updatedTaskList = sprintTaskList.map((task) => {
      if (task.id === id) {
        return { ...task, priority };
      }
      return task;
    });
    setSprintTaskList(updatedTaskList);
  };
  const onClickDelete = (id: string) => {
    const updatedTaskList = sprintTaskList.filter((task) => task.id !== id);
    setSprintTaskList(updatedTaskList);
  };
  return (
    <section className={[styles.container, styles.sprintContainer].join(' ')}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h1>Current Sprint</h1>
          <div className={styles.issueCount}>{sprintTaskList.length} issues</div>
        </div>
        <div className={styles.toolbar}>
          <Button>Create sprint</Button>
          <IconButton icon={<BiDotsHorizontal />} tooltip="actions" onClick={undefined} />
        </div>
      </div>
      <div className={styles.listContainer}>
        {sprintTaskList.map((task) => {
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
