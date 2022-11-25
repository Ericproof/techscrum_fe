import React, { useRef, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../../components/Button/Button';
import TaskTypeSelect from '../../../components/Select/TaskTypeSelect/TaskTypeSelect';
import TaskItem from '../TaskItem/TaskItem';
import styles from './BacklogSection.module.scss';
import { addTask } from '../../../api/backlog/backlog';
import { IUserInfo, Itypes, IStatusBacklog } from '../../../types';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import CreateEditSprint from '../CreateEditSprint/CreateEditSprint';

interface IBacklogSection {
  backlogData: any;
  getBacklogDataApi: () => void;
  statusData: IStatusBacklog[];
  typesData: Itypes[] | null;
  userList: IUserInfo[];
  sprintData: any;
}

export default function BacklogSection({
  backlogData,
  getBacklogDataApi,
  statusData,
  typesData,
  userList,
  sprintData
}: IBacklogSection) {
  const [currentTypeOption, setCurrentTypeOption] = useState('story');
  const { boardId = '', projectId = '' } = useParams();
  const [showCreateSprint, setShowCreateSprint] = useState(false);
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
          sprintId: null,
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

  const createSprint = () => {
    setShowCreateSprint(true);
  };

  const calculateShowDropDownTop = () => {
    if (sprintData.length > 3) {
      return true;
    }
    let totalTask = 0;
    sprintData.forEach((sprint) => {
      sprint.taskId.forEach(() => {
        totalTask += 1;
      });
    });
    totalTask += backlogData.cards.length;
    return totalTask > 8;
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h1>Backlog</h1>
          <div className={styles.issueCount}>{backlogData.cards.length} issues</div>
        </div>
        <div className={styles.toolbar}>
          <Button onClick={createSprint}>Create sprint</Button>
          {showCreateSprint && (
            <CreateEditSprint
              type="Create"
              onClickCloseModal={() => {
                setShowCreateSprint(false);
              }}
              getBacklogDataApi={getBacklogDataApi}
            />
          )}
        </div>
      </div>
      <div className={styles.listContainer}>
        {backlogData.cards.map((task, index) => {
          return (
            <TaskItem
              task={task}
              key={task.id}
              statusData={statusData}
              userList={userList}
              sprintData={sprintData}
              showDropDownOnTop={calculateShowDropDownTop() && index > backlogData.cards.length - 4}
              getBacklogDataApi={getBacklogDataApi}
            />
          );
        })}
      </div>
      {visible ? (
        <form>
          <div className={styles.formField} ref={myRef}>
            <TaskTypeSelect
              showDropDownOnTop={calculateShowDropDownTop()}
              setCurrentTypeOption={setCurrentTypeOption}
            />
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
