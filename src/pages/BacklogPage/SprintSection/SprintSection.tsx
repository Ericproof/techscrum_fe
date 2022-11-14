import React, { useRef, useState } from 'react';
import { BiDotsHorizontal } from 'react-icons/bi';
import { GoPlus } from 'react-icons/go';
import { useParams } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import IconButton from '../../../components/Button/IconButton/IconButton';
import TaskTypeSelect from '../../../components/Select/TaskTypeSelect/TaskTypeSelect';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import TaskItem from '../TaskItem/TaskItem';
import { addTask, updateTask, deleteTask } from '../../../api/backlog/backlog';
import styles from './SprintSection.module.scss';
import { IUserInfo, Itypes, IStatusBacklog } from '../../../types';

// WIP need to communicate with backend
interface ISprintSection {
  sprintData: any;
  getBacklogDataApi: () => void;
  loaded: boolean;
  statusData: IStatusBacklog[];
  typesData: Itypes[] | null;
  typeStatusUserLoaded: boolean;
  userList: IUserInfo[];
}
export default function SprintSection({
  sprintData,
  getBacklogDataApi,
  loaded,
  typeStatusUserLoaded,
  statusData,
  typesData,
  userList
}: ISprintSection) {
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
    <section className={[styles.container, styles.sprintContainer].join(' ')}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h1>Current Sprint</h1>
          <div className={styles.issueCount}>{loaded && sprintData.cards.length} issues</div>
        </div>
        <div className={styles.toolbar}>
          <IconButton icon={<BiDotsHorizontal />} tooltip="actions" onClick={undefined} />
        </div>
      </div>
      <div className={styles.listContainer}>
        {loaded &&
          typeStatusUserLoaded &&
          sprintData.cards.map((task) => {
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
                sprintId={task.sprintId}
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
              name="newTask"
              id="newTask"
              onKeyDown={onKeyDownCreateIssue}
              ref={createIssueRef}
            />
          </div>
        </form>
      ) : (
        <Button icon={<GoPlus />} overrideStyle={styles.buttonRow} onClick={() => setVisible(true)}>
          Create issue
        </Button>
      )}
    </section>
  );
}
