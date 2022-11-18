import React, { useRef, useState } from 'react';
import { BiDotsHorizontal } from 'react-icons/bi';
import { GoPlus } from 'react-icons/go';
import { useParams } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { toast } from 'react-toastify';
import Button from '../../../components/Button/Button';
import IconButton from '../../../components/Button/IconButton/IconButton';
import TaskTypeSelect from '../../../components/Select/TaskTypeSelect/TaskTypeSelect';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import TaskItem from '../TaskItem/TaskItem';
import { addTask, updateTask, deleteTask } from '../../../api/backlog/backlog';
import styles from './SprintSection.module.scss';
import { IUserInfo, Itypes, IStatusBacklog } from '../../../types';
import CreateEditSprint from '../CreateEditSprint/CreateEditSprint';
import { updateSprint } from '../../../api/sprint/sprint';

interface ISprintSection {
  sprint: any;
  sprintData: any;
  getBacklogDataApi: () => void;
  loaded: boolean;
  statusData: IStatusBacklog[];
  typesData: Itypes[] | null;
  typeStatusUserLoaded: boolean;
  userList: IUserInfo[];
}
export default function SprintSection({
  sprint,
  getBacklogDataApi,
  loaded,
  typeStatusUserLoaded,
  statusData,
  typesData,
  userList,
  sprintData
}: ISprintSection) {
  const [currentTypeOption, setCurrentTypeOption] = useState('story');
  const [showEditSprint, setShowEditSprint] = useState(false);
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
        sprintId: sprint.id
      };
      setCurrentTypeOption('story');
      addTask(data)
        .then(() => {
          getBacklogDataApi();
        })
        .catch(() => {
          toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
        });
    }
  };

  const { visible, setVisible, myRef } = useOutsideAlerter(false, createIssueAction);

  const onChangeTitle = (id: string, title: string) => {
    const data = { title };
    updateTask(id, data)
      .then(() => {
        getBacklogDataApi();
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
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
    updateTask(id, data)
      .then(() => {
        getBacklogDataApi();
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      });
  };
  const onClickDelete = (id: string) => {
    deleteTask(id)
      .then(() => {
        getBacklogDataApi();
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      });
  };
  const onClickChangeAssignee = (id: string, assigneeId: string) => {
    const data = { assignId: assigneeId };
    updateTask(id, data)
      .then(() => {
        getBacklogDataApi();
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      });
  };
  const onClickChangePriority = (id: string, priority: string) => {
    const data = { priority };
    updateTask(id, data)
      .then(() => {
        getBacklogDataApi();
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      });
  };
  const dateWithDay = (date: Date | null) => {
    if (date != null) {
      const fullDate = date.toString().split('T')[0];
      const dateDataArray = fullDate.split('-');
      return `${dateDataArray[1]}-${dateDataArray[2]}-${dateDataArray[0]}`;
    }
    return '';
  };
  const onClickAddToBacklog = (id: string) => {
    const data = { sprintId: null };
    updateTask(id, data)
      .then(() => {
        getBacklogDataApi();
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      });
  };
  const onClickAddToSprint = (taskId: string, sprintId: string) => {
    const data = { sprintId };
    updateTask(taskId, data)
      .then(() => {
        getBacklogDataApi();
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      });
  };
  const onClickStartSprint = (sprintId: string) => {
    const data = { currentSprint: true };
    updateSprint(sprintId, data)
      .then(() => {
        getBacklogDataApi();
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      });
  };
  const onClickCompleteSprint = (sprintId: string) => {
    const data = { isComplete: true, currentSprint: false };
    updateSprint(sprintId, data)
      .then(() => {
        getBacklogDataApi();
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      });
  };
  return (
    <section className={[styles.container, styles.sprintContainer].join(' ')}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h1>{sprint.name}</h1>
          <div className={styles.dateAndIssueCount}>
            <div className={styles.date}>
              <p>{dateWithDay(sprint.startDate)}</p>
              <BsArrowRight />
              <p> {dateWithDay(sprint.endDate)}</p>
            </div>
            <div className={styles.issueCount}> ({loaded && sprint.taskId.length} issues)</div>
          </div>
        </div>
        <div className={styles.toolbar}>
          {sprint.currentSprint ? (
            <Button
              onClick={() => {
                onClickCompleteSprint(sprint.id);
              }}
            >
              Complete Sprint
            </Button>
          ) : (
            <Button
              onClick={() => {
                onClickStartSprint(sprint.id);
              }}
            >
              Start Sprint
            </Button>
          )}
          <IconButton
            icon={<BiDotsHorizontal />}
            tooltip="actions"
            onClick={() => {
              setShowEditSprint(true);
            }}
          />

          {showEditSprint && (
            <CreateEditSprint
              type="Edit"
              onClickCloseModal={() => {
                setShowEditSprint(false);
              }}
              getBacklogDataApi={getBacklogDataApi}
              currentSprint={sprint}
            />
          )}
        </div>
      </div>
      <div className={styles.listContainer}>
        {loaded &&
          typeStatusUserLoaded &&
          sprint.taskId.map((task) => {
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
                onClickAddToBacklog={onClickAddToBacklog}
                onClickAddToSprint={onClickAddToSprint}
                sprintData={sprintData}
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
