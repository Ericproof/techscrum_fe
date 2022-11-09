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
  typesLoaded: boolean;
  typesData: any;
}

export default function BacklogSection({
  backlogData,
  getBacklogDataApi,
  loaded,
  typesLoaded,
  typesData
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
        typeId: typesData.filter((types) => {
          return types.slug === currentTypeOption;
        })[0].id,
        boardId,
        projectId,
        sprintId: null
      };
      addTask(data).then(() => {
        getBacklogDataApi();
      });
    }
    setShowBacklogInput(false);
  }, [typesData, boardId, projectId, currentTypeOption, getBacklogDataApi]);

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
    const data = {
      status: status.toLowerCase()
    };
    updateTask(id, data).then(() => {
      getBacklogDataApi();
    });
  };
  const onClickDelete = (id: string) => {
    deleteTask(id).then(() => {
      getBacklogDataApi();
    });
  };
  const onClickChangePriority = (id: string, priority: string) => {
    const data = { priority };
    updateTask(id, data).then(() => {
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
          typesLoaded &&
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
                priority={task.priority}
                onClickChangePriority={onClickChangePriority}
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
