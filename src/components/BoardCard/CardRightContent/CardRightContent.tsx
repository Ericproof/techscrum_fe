import React, { useContext, useState } from 'react';
import { CgArrowRightR } from 'react-icons/cg';
import { MdOutlineBookmarkBorder } from 'react-icons/md';
import { RiFlag2Line } from 'react-icons/ri';
import { BsPeople } from 'react-icons/bs';
import { AiOutlineCalendar } from 'react-icons/ai';
import { IColumnsFromBackend, ILabelData, IOnChangeProjectLead, ITaskEntity } from '../../../types';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import style from './CardRightContent.module.scss';
import ReporterFields from './ReporterFields/ReporterFields';
import LabelFields from './LabelFields/LabelFields';
import UserSelect from '../../Form/Select/UserSelect/UserSelect';
import checkAccess from '../../../utils/helpers';
import DueDatePicker from '../../DueDatePicker/DueDatePicker';
import { UserContext } from '../../../context/UserInfoProvider';
import { TaskTypesContext } from '../../../context/TaskTypeProvider';
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
  onSave: (data: ITaskEntity) => void;
}

export default function CardRightContent({
  columnsInfo,
  taskInfo,
  taskStatusOnchange,
  labels,
  projectId,
  updateTaskTags,
  onSave
}: Props) {
  const TYPE = {
    story:
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
    task: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
    bug: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium'
  };
  const PRIORITY = {
    Highest: 'https://010001.atlassian.net/images/icons/priorities/highest.svg',
    High: 'https://010001.atlassian.net/images/icons/priorities/high.svg',
    Medium: 'https://010001.atlassian.net/images/icons/priorities/medium.svg',
    Low: 'https://010001.atlassian.net/images/icons/priorities/low.svg',
    Lowest: 'https://010001.atlassian.net/images/icons/priorities/lowest.svg'
  };
  const priorityOptions = ['Highest', 'High', 'Medium', 'Low', 'Lowest'];
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const handleClickOutside = () => setVisible(true);
  const editAccess = checkAccess('edit:tasks', projectId);
  const userInfo = useContext(UserContext);
  const operation = 'updated';
  const userId = userInfo.id;
  const taskId = taskInfo.id;
  const [showSelectDropDown, setShowSelectDropDown] = useState(false);
  const [showPriorityDropDown, setShowPriorityDropDown] = useState(false);
  const [selectedTypeIcon, setSelectedTypeIcon] = useState(TYPE[taskInfo.typeId.slug]);
  const [selectedType, setSelectedType] = useState(taskInfo.typeId.slug);
  const [selectedPriorityIcon, setSelectedPriorityIcon] = useState(PRIORITY[taskInfo.priority]);
  const [selectedPriority, setSelectedPriority] = useState(taskInfo.priority);
  const taskTypes = useContext(TaskTypesContext);

  const dateHandler = (fullDate) => {
    const date = new Date(fullDate);
    const year = date.getFullYear();
    let month: string | number = date.getMonth();
    let day: string | number = date.getDate();
    day = day < 10 ? `0${day}` : day;
    month = month + 1 < 10 ? `0${month + 1}` : month + 1;
    return `${day}-${month}-${year}`;
  };

  const reporterOnchangeEventHandler = async (e: IOnChangeProjectLead) => {
    const updatedTaskInfo = { ...taskInfo };
    updatedTaskInfo.reporterId = !e.target.value ? undefined : e.target.value;
    taskStatusOnchange(updatedTaskInfo);
    await createActivity({ operation, userId, taskId });
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

  const onClickIssueType = (task: ITaskEntity) => {
    const updateTaskInfo = { ...taskInfo };
    updateTaskInfo.typeId = task;
    setSelectedTypeIcon(TYPE[task.slug]);
    setSelectedType(task.slug);
    setShowSelectDropDown(false);
    onSave(updateTaskInfo);
  };

  const onClickPriorityOption = (task: string) => {
    const updateTaskInfo = { ...taskInfo };
    updateTaskInfo.priority = task;
    setSelectedPriorityIcon(PRIORITY[task]);
    setSelectedPriority(task);
    setShowPriorityDropDown(false);
    onSave(updateTaskInfo);
  };

  if (!taskInfo) {
    return <div />;
  }

  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style.boxBody}>
          <div className={style.type}>
            <div className={style.leftContent}>
              <CgArrowRightR className={style.reactIcon} />
              <div>Type</div>
            </div>
            <div className={style.rightContent}>
              <div>
                <button
                  className={style.storyIcon}
                  data-testid="card-type-button"
                  type="button"
                  onClick={() => {
                    setShowSelectDropDown((prevState) => !prevState);
                  }}
                >
                  <img src={selectedTypeIcon} alt="Story" />
                  <div>{selectedType}</div>
                </button>
              </div>
              {showSelectDropDown && checkAccess('edit:tasks', projectId) && (
                <div className={style.taskTypeList}>
                  <p className={style.typeListTitle}>CHANGE ISSUE TYPE</p>
                  {taskTypes.map((taskType) => {
                    const src = TYPE[taskType.slug];
                    const alt = taskType.slug;
                    return (
                      <button
                        className={style.typeListOption}
                        data-testid="card-type-selection"
                        key={taskType.id}
                        onClick={() => {
                          onClickIssueType(taskType);
                        }}
                      >
                        <img src={src} alt={alt} />
                        <p>{taskType.name}</p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className={style.type}>
            <div className={style.leftContent}>
              <MdOutlineBookmarkBorder className={style.reactIcon} />
              <div>Status</div>
            </div>
            <div ref={myRef} className={style.statusSection}>
              {visible && editAccess ? (
                <>
                  <button
                    type="button"
                    className={style.toDoButton}
                    onClick={handleClickOutside}
                    data-testid="card-status-button"
                  >
                    {taskInfo.status && taskInfo.status.name.toUpperCase()}
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
                              data-testid="card-status-selection"
                              onClick={() => {
                                setVisible(false);
                                const updatedTaskInfo = { ...taskInfo };
                                updatedTaskInfo.statusId = id;
                                const { items, ...rest } = column;
                                updatedTaskInfo.status = { ...rest, id };
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
                <button
                  type="button"
                  className={style.toDoButton}
                  onClick={handleClickOutside}
                  data-testid="card-status-button"
                >
                  {taskInfo.status && taskInfo.status.name.toUpperCase()}
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
          </div>
          <div className={style.dueDate}>
            <div className={style.leftContent}>
              <AiOutlineCalendar className={style.reactIcon} />
              <div>Due date</div>
            </div>
            <DueDatePicker
              taskInfo={taskInfo}
              dueDateOnchange={taskStatusOnchange}
              isDisabled={editAccess}
            />
          </div>
          <div className={style.type}>
            <div className={style.leftContent}>
              <RiFlag2Line className={style.reactIcon} />
              <div>Priority</div>
            </div>
            <div className={style.rightContent}>
              <button
                className={style.storyIcon}
                data-testid="card-priority-button"
                type="button"
                onClick={() => {
                  setShowPriorityDropDown((prevState) => !prevState);
                }}
              >
                <img
                  className={style.priorityImg}
                  src={selectedPriorityIcon}
                  alt={taskInfo.priority}
                />
                <div>{selectedPriority}</div>
              </button>
              {showPriorityDropDown && checkAccess('edit:tasks', projectId) && (
                <div className={style.taskTypeList}>
                  {priorityOptions.map((priorityOption) => {
                    const src = PRIORITY[priorityOption];
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <button
                        className={style.typeListOption}
                        data-testid="card-priority-selection"
                        onClick={() => {
                          onClickPriorityOption(priorityOption);
                        }}
                      >
                        <img className={style.priorityImg} src={src} alt={priorityOption} />
                        {priorityOption}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <ReporterFields
            taskInfo={taskInfo}
            projectId={projectId}
            reporterOnchangeEventHandler={reporterOnchangeEventHandler}
          />
          <Row classesName={style.fieldMargin}>
            <div className={['fullWidth', style.label].join(' ')}>
              <BsPeople className={style.reactIcon} />
              <div>Assignee</div>
            </div>
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
        </div>
      </div>
    </div>
  );
}
