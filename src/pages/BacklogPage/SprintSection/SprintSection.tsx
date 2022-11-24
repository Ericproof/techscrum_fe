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
import { addTask } from '../../../api/backlog/backlog';
import styles from './SprintSection.module.scss';
import { IUserInfo, Itypes, IStatusBacklog } from '../../../types';
import CreateEditSprint from '../CreateEditSprint/CreateEditSprint';
import { updateSprint } from '../../../api/sprint/sprint';

interface ISprintSection {
  sprint: any;
  sprintData: any;
  statusData: IStatusBacklog[];
  typesData: Itypes[] | null;
  userList: IUserInfo[];
  getBacklogDataApi: () => void;
}
export default function SprintSection({
  sprint,
  statusData,
  typesData,
  userList,
  sprintData,
  getBacklogDataApi
}: ISprintSection) {
  const [currentTypeOption, setCurrentTypeOption] = useState('story');
  const [showEditSprint, setShowEditSprint] = useState(false);
  const { boardId = '', projectId = '' } = useParams();
  const createIssueRef = useRef<HTMLInputElement | null>(null);

  const { visible, setVisible, myRef } = useOutsideAlerter(false);

  const onKeyDownCreateIssue = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (createIssueRef?.current?.value) {
        const data = {
          title: createIssueRef?.current?.value,
          status: 'to do',
          typeId: typesData?.filter((types) => {
            return types.slug === currentTypeOption;
          })[0].id,
          boardId,
          projectId,
          sprintId: sprint.id,
          dueAt: new Date(),
          description: ''
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
      setVisible(false);
    }
  };

  const dateWithDay = (date: Date | null) => {
    if (date != null) {
      const fullDate = date.toString().split('T')[0];
      const dateDataArray = fullDate.split('-');
      return `${dateDataArray[1]}-${dateDataArray[2]}-${dateDataArray[0]}`;
    }
    return '';
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
            <div className={styles.issueCount}> ({sprint.taskId.length} issues)</div>
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
        {sprint.taskId.map((task) => {
          return (
            <TaskItem
              key={task.id}
              task={task}
              sprintData={sprintData}
              statusData={statusData}
              userList={userList}
              getBacklogDataApi={getBacklogDataApi}
            />
          );
        })}
      </div>
      {visible ? (
        <form>
          <div className={styles.formField} ref={myRef}>
            <TaskTypeSelect setCurrentTypeOption={setCurrentTypeOption} />
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
