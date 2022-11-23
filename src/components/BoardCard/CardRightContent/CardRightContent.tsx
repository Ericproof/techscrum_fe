import React, { useContext } from 'react';
import { IColumnsFromBackend, ILabelData, IOnChangeProjectLead, ITaskEntity } from '../../../types';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import style from './CardRightContent.module.scss';
import ReporterFields from './ReporterFields/ReporterFields';
import LabelFields from './LabelFields/LabelFields';
import UserSelect from '../../Form/Select/UserSelect/UserSelect';
import checkAccess from '../../../utils/helpers';
import DueDatePicker from '../../DueDatePicker/DueDatePicker';
import { UserContext } from '../../../context/UserInfoProvider';
import { createActivity } from '../../../api/activity/activity';
import { createDailyScrum, getDailyScrums } from '../../../api/dailyScrum/dailyScrum';
import Row from '../../../lib/Grid/Row/Row';

interface Props {
  taskInfo: ITaskEntity;
  columnsInfo: IColumnsFromBackend;
  taskStatusOnchange: (taskInfo: ITaskEntity) => void;
  labels: ILabelData[];
  projectId: string;
  updateTaskTags: (tags: ILabelData[] | undefined) => void;
}

export default function CardRightContent({
  columnsInfo,
  taskInfo,
  taskStatusOnchange,
  labels,
  projectId,
  updateTaskTags
}: Props) {
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const handleClickOutside = () => setVisible(true);
  const editAccess = checkAccess('edit:tasks', projectId);
  const userInfo = useContext(UserContext);
  const operation = 'updated';
  const userId = userInfo.id;
  const taskId = taskInfo.id;
  const dateHandler = (fullDate) => {
    const date = new Date(fullDate);
    const year = date.getFullYear();
    let month: string | number = date.getMonth();
    let day: string | number = date.getDate();
    day = day < 10 ? `0${day}` : day;
    month = month + 1 < 10 ? `0${month + 1}` : month + 1;
    return `${day}-${month}-${year}`;
  };

  const assigneeOnchangeEventHandler = async (e: IOnChangeProjectLead) => {
    const updatedTaskInfo = { ...taskInfo };
    updatedTaskInfo.assignId = !e.target.value ? undefined : e.target.value;
    taskStatusOnchange(updatedTaskInfo);
    await createActivity({ operation, userId, taskId });
    const { assignId } = updatedTaskInfo;
    if (assignId) {
      const createdDate = dateHandler(new Date());
      const data = {
        title: updatedTaskInfo.title,
        progress: 0,
        isFinished: false,
        hasReason: false,
        reason: '',
        isNeedSupport: false,
        userId: assignId,
        taskId: updatedTaskInfo.id,
        createdDate
      };
      const searchCase = 'search-by-user-task-date';
      const resultsForThisTask = await getDailyScrums(
        projectId,
        'none',
        taskId,
        dateHandler(new Date()),
        searchCase
      );
      if (resultsForThisTask.data.length === 0) {
        await createDailyScrum(projectId, data);
      }
    }
  };

  const monthShortNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  const dateWithTimestamp = (d: Date | null) => {
    if (d != null) {
      const date = d.toString().split('T')[0];
      const dateDataArray = date.split('-');
      const time = d.toString().split('T')[1].split(':');
      const hour = Number(time[0]);
      time[0] = hour > 12 ? `${hour - 12}` : `${hour}`;
      const period = hour < 12 ? 'AM' : 'PM';
      return `${monthShortNames[Number(dateDataArray[1]) - 1]} ${dateDataArray[2]}, ${
        dateDataArray[0]
      } at ${time[0]}:${time[1]} ${period}`;
    }
    return '';
  };

  if (!taskInfo) {
    return <div />;
  }

  return (
    <div className={style.container}>
      <div ref={myRef} className={style.statusSection}>
        {visible && editAccess ? (
          <>
            <button type="button" className={style.toDoButton} onClick={handleClickOutside}>
              <span>{columnsInfo[taskInfo.statusId ?? ''].name ?? ''}</span>
              <svg viewBox="0 0 24 24" role="presentation">
                <path
                  d="M8.292 10.293a1.009 1.009 0 000 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 000-1.419.987.987 0 00-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 00-1.406 0z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </button>
            <div className={style.dropdownSection}>
              <ul>
                {Object.entries(columnsInfo).map(([id, column]) => {
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        name="status"
                        className={style.statusOptions}
                        onClick={() => {
                          setVisible(false);
                          const updatedTaskInfo = { ...taskInfo };
                          updatedTaskInfo.statusId = id;
                          taskStatusOnchange(updatedTaskInfo);
                        }}
                      >
                        <span>{column.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        ) : (
          <button type="button" className={style.toDoButton} onClick={handleClickOutside}>
            <span>{columnsInfo[taskInfo.statusId ?? '']?.name ?? ''}</span>
            {editAccess && (
              <svg viewBox="0 0 24 24" role="presentation">
                <path
                  d="M8.292 10.293a1.009 1.009 0 000 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 000-1.419.987.987 0 00-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 00-1.406 0z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            )}
          </button>
        )}
      </div>
      <div className={style.box}>
        <div className={style.detail}>
          <span>Detail</span>
        </div>
        <div className={style.boxBody}>
          <Row classesName={style.fieldMargin}>
            <div className={['fullWidth', style.label].join(' ')}>Assignee</div>
            <UserSelect
              onChange={assigneeOnchangeEventHandler}
              value={taskInfo.assignId}
              allowEdit={editAccess}
            />
          </Row>
          <LabelFields
            labels={labels}
            taskInfo={taskInfo}
            isDisabled={!editAccess}
            updateTaskTags={updateTaskTags}
          />
          <div className={style.dueDate}>
            <div>Due date</div>
            <DueDatePicker
              taskInfo={taskInfo}
              dueDateOnchange={taskStatusOnchange}
              isDisabled={editAccess}
            />
          </div>
          <ReporterFields reporterInfo={taskInfo.reporterId ?? {}} />
        </div>
      </div>
      <div className={style.createAndUpdateDate}>
        <span>Created {dateWithTimestamp(taskInfo.createdAt ?? null)}</span>
        <span>Updated {dateWithTimestamp(taskInfo.updatedAt ?? null)}</span>
      </div>
    </div>
  );
}
