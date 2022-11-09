import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoPlus } from 'react-icons/go';
import { useParams } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import TaskTypeSelect from '../../../components/Select/TaskTypeSelect/TaskTypeSelect';
import TaskItem from '../TaskItem/TaskItem';
import styles from './BacklogSection.module.scss';
import { addTask, updateTask, deleteTask } from '../../../api/backlog/backlog';

interface IBacklogSection {
  backlogData: any;
  getBacklogDataApi: () => void;
  loaded: boolean;
  statusLoaded: boolean;
  statusData: any;
}

export default function BacklogSection({
  backlogData,
  getBacklogDataApi,
  loaded,
  statusLoaded,
  statusData
}: IBacklogSection) {
  const [showBacklogInput, setShowBacklogInput] = useState(false);
  const [backlogInputFocus, setBacklogInputFocus] = useState(false);
  const [currentTypeOption, setCurrentTypeOption] = useState('story');
  const [editId, setEditId] = useState('-1');
  const { boardId = '', projectId = '' } = useParams();

  const backlogFormRef = useRef<HTMLFormElement | null>(null);
  const createIssueRef = useRef<HTMLInputElement | null>(null);

  const createIssueAction = useCallback(() => {
    if (createIssueRef?.current?.value) {
      const data = {
        title: createIssueRef?.current?.value,
        status: 'to do',
        typeId: {
          createdAt: new Date().toISOString(),
          name: currentTypeOption.charAt(0).toUpperCase() + currentTypeOption.slice(1),
          slug: currentTypeOption,
          updatedAt: new Date().toISOString(),
          _v: 0,
          _id: '631d94d08a05945727602cd1'
        },
        boardId,
        projectId,
        sprintId: null
      };
      addTask(data).then(() => {
        getBacklogDataApi();
      });
    }
    setShowBacklogInput(false);
  }, [boardId, currentTypeOption, projectId, getBacklogDataApi]);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (backlogInputFocus && !backlogFormRef.current?.contains(e.target as HTMLElement)) {
        createIssueAction();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [backlogInputFocus, createIssueAction]);

  const onClickEditId = (id: string) => {
    setEditId(id);
  };

  const onChangeTitle = (id: string, title: string) => {
    const data = { title };
    updateTask(id, data).then(() => {
      getBacklogDataApi();
    });
  };

  const onKeyDownCreateIssue = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createIssueAction();
    }
  };
  const getCurrentTypeOption = (type: string) => {
    setCurrentTypeOption(type);
  };
  const onClickChangeStatus = (id: string, status: string) => {
    // const data = {
    //   status: status.toLowerCase()
    // };
    // updateTask(id, data).then(() => {
    //   getBacklogDataApi();
    // });

    // eslint-disable-next-line no-console
    console.log(id, status);
  };
  const onClickDelete = (id: string) => {
    deleteTask(id).then(() => {
      getBacklogDataApi();
    });
  };
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h1>Backlog</h1>
          <div className={styles.issueCount}>{loaded && backlogData.cards.length} issues</div>
        </div>
        <div className={styles.toolbar}>
          <Button>Create sprint</Button>
        </div>
      </div>
      <div className={styles.listContainer}>
        {loaded &&
          statusLoaded &&
          backlogData.cards.map((task) => {
            return (
              <TaskItem
                taskTitle={task.title}
                key={task.id}
                taskId={task.id}
                id={'TEC-'.concat(task.id.slice(task.id.length - 3))}
                editMode={editId === task.id}
                onClickEditId={onClickEditId}
                onChangeTitle={onChangeTitle}
                type={task.typeId.slug}
                status={task.status.name.toUpperCase()}
                onClickChangeStatus={onClickChangeStatus}
                onClickDelete={onClickDelete}
                statusData={statusData}
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
              data-testid="create-issue-input"
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
          <p data-testid="create-issue">Create issue</p>
        </Button>
      )}
    </section>
  );
}
