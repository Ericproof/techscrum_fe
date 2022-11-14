import React, { useRef, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { useParams } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import TaskTypeSelect from '../../../components/Select/TaskTypeSelect/TaskTypeSelect';
import TaskItem from '../TaskItem/TaskItem';
import styles from './BacklogSection.module.scss';
import { addTask, updateTask, deleteTask } from '../../../api/backlog/backlog';
import { IUserInfo, Itypes, IStatusBacklog } from '../../../types';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';

interface IBacklogSection {
  backlogData: any;
  getBacklogDataApi: () => void;
  loaded: boolean;
  statusData: IStatusBacklog[];
  typesData: Itypes[] | null;
  typeStatusUserLoaded: boolean;
  userList: IUserInfo[];
}

export default function BacklogSection({
  backlogData,
  getBacklogDataApi,
  loaded,
  typeStatusUserLoaded,
  statusData,
  typesData,
  userList
}: IBacklogSection) {
  const [currentTypeOption, setCurrentTypeOption] = useState('story');
  const { boardId = '', projectId = '' } = useParams();
  const createIssueRef = useRef<HTMLInputElement | null>(null);
  const createIssueAction = () => {
    if (createIssueRef?.current?.value) {
      const data = {
        title: createIssueRef?.current?.value,
        status: 'to do',
        typeId: typesData?.filter((types) => {
          return types.slug === currentTypeOption;
        })[0].id,
        boardId,
        projectId,
        sprintId: null
      };
      setCurrentTypeOption('story');
      addTask(data).then(() => {
        getBacklogDataApi();
      });
    }
  };

  const { visible, setVisible, myRef } = useOutsideAlerter(false, createIssueAction);

  const onChangeTitle = (id: string, title: string) => {
    const data = { title };
    updateTask(id, data).then(() => {
      getBacklogDataApi();
    });
  };

  const onKeyDownCreateIssue = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createIssueAction();
      setVisible(false);
    }
  };
  const getCurrentTypeOption = (type: string) => {
    setCurrentTypeOption(type);
  };
  const onClickChangeStatus = (id: string, statusId: string) => {
    const data = { status: statusId };
    updateTask(id, data).then(() => {
      getBacklogDataApi();
    });
  };
  const onClickDelete = (id: string) => {
    deleteTask(id).then(() => {
      getBacklogDataApi();
    });
  };
  const onClickChangeAssignee = (id: string, assigneeId: string) => {
    const data = { assignId: assigneeId };
    updateTask(id, data).then(() => {
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
          typeStatusUserLoaded &&
          backlogData.cards.map((task) => {
            return (
              <TaskItem
                key={task.id}
                taskTitle={task.title}
                taskId={task.id}
                issueId={'TEC-'.concat(task.id.slice(task.id.length - 3))}
                onChangeTitle={onChangeTitle}
                type={task.typeId.slug}
                status={task.status.name.toUpperCase()}
                onClickChangeStatus={onClickChangeStatus}
                onClickDelete={onClickDelete}
                statusData={statusData}
                onClickChangeAssignee={onClickChangeAssignee}
                userList={userList}
                assignee={task.assignId}
                priority={task.priority}
                onClickChangePriority={onClickChangePriority}
              />
            );
          })}
      </div>
      {visible ? (
        <form>
          <div className={styles.formField} ref={myRef}>
            <TaskTypeSelect onChangeType={getCurrentTypeOption} />
            <input
              className={styles.input}
              type="text"
              name="newBacklog"
              id="newBacklog"
              data-testid="create-issue-input"
              ref={createIssueRef}
              onKeyDown={onKeyDownCreateIssue}
            />
          </div>
        </form>
      ) : (
        <Button icon={<GoPlus />} overrideStyle={styles.buttonRow} onClick={() => setVisible(true)}>
          <p data-testid="create-issue">Create issue</p>
        </Button>
      )}
    </section>
  );
}
