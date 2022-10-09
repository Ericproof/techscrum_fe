import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoPlus } from 'react-icons/go';
import Button from '../../../components/Button/Button';
import TaskTypeSelect from '../../../components/Select/TaskTypeSelect/TaskTypeSelect';
import TaskItem from '../TaskItem/TaskItem';
import styles from './BacklogSection.module.scss';
// WIP more function will be added

export default function BacklogSection() {
  const dummyTaskList = [
    {
      id: 'TEC-315',
      title: 'Task 1',
      type: 'Story',
      imgUrl:
        'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
      status: 'TO DO',
      priority: 'Medium'
    },
    {
      id: 'TEC-316',
      title: 'Task 2',
      type: 'Bug',
      imgUrl:
        'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium',
      status: 'TO DO',
      priority: 'Medium'
    },
    {
      id: 'TEC-317',
      title: 'Task 3',
      type: 'Task',
      imgUrl:
        'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
      status: 'TO DO',
      priority: 'Medium'
    }
  ];
  const initialType = {
    type: 'story',
    imgUrl:
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium'
  };
  const [showBacklogInput, setShowBacklogInput] = useState(false);
  const [backlogInputFocus, setBacklogInputFocus] = useState(false);
  const [currentTypeOption, setCurrentTypeOption] = useState(initialType);

  const [editId, setEditId] = useState('-1');
  const [taskList, setTaskList] = useState(dummyTaskList);

  const backlogFormRef = useRef<HTMLFormElement | null>(null);
  const createIssueRef = useRef<HTMLInputElement | null>(null);

  const createIssueAction = useCallback(() => {
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
    setShowBacklogInput(false);
  }, [currentTypeOption.imgUrl, currentTypeOption.type, initialType, taskList]);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (backlogInputFocus && !backlogFormRef.current?.contains(e.target)) {
        createIssueAction();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [
    backlogInputFocus,
    createIssueAction,
    currentTypeOption.imgUrl,
    currentTypeOption.type,
    initialType,
    taskList
  ]);

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
      createIssueAction();
    }
  };
  const getCurrentTypeOption = (option: { type: string; imgUrl: string }) => {
    setCurrentTypeOption(option);
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
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h1>Backlog</h1>
          <div className={styles.issueCount}>{taskList.length} issues</div>
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
      {showBacklogInput ? (
        <form ref={backlogFormRef}>
          <div className={styles.formField}>
            <TaskTypeSelect onChangeType={getCurrentTypeOption} />
            <input
              className={styles.input}
              type="text"
              name="newBacklog"
              id="newBacklog"
              onFocus={() => {
                setBacklogInputFocus(true);
              }}
              ref={createIssueRef}
              onKeyDown={onKeyDownCreateIssue}
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
