/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { RiMoreFill } from 'react-icons/ri';
import { TaskEntity } from '../../../api/task/entity/task';
import { TaskTypesContext } from '../../../context/TaskTypeProvider';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import checkAccess from '../../../utils/helpers';
import style from './CardHeader.module.scss';

interface Props {
  updateIsViewTask: () => void;
  taskInfo: TaskEntity;
  deleteTask: () => void;
  projectId: string;
  onSave: (data: any) => void;
}
// https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium
// https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium

const TYPE: any = {
  story:
    'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
  task: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
  bug: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium'
};
export default function CardHeader({
  updateIsViewTask,
  taskInfo,
  deleteTask,
  projectId,
  onSave
}: Props) {
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const handleClickOutside = () => setVisible(!visible);
  const taskType = useContext(TaskTypesContext);
  const [selectedType, setSelectedType] = useState(
    'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium'
  );
  const [showSelectDropDown, setShowSelectDropDown] = useState(false);

  useEffect(() => {
    setSelectedType(TYPE[taskInfo?.typeId?.slug]);
  }, [taskInfo.id]);

  const onClickIssueType = (task: any) => {
    const updateTaskInfo = { ...taskInfo };
    updateTaskInfo.typeId = task;
    setSelectedType(TYPE[task.slug]);
    setShowSelectDropDown(false);
    onSave(updateTaskInfo);
  };

  return (
    <header className={style.container}>
      <div className={style.headerLeft}>
        <button
          className={style.storyIcon}
          type="button"
          onClick={() => {
            setShowSelectDropDown(!showSelectDropDown);
          }}
        >
          <img src={selectedType} alt="Story" />
        </button>
        {showSelectDropDown && checkAccess('edit:tasks', projectId) && (
          <div className={style.taskTypeList}>
            <p className={[style.storyIcon, style.header].join(' ')}>Change Issue Type</p>
            {taskType.map((item: any) => {
              let src =
                'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium';
              if (item?.slug) {
                const { slug } = item;
                src = TYPE[slug];
              }
              return (
                <button
                  key={item.id}
                  className={style.storyIcon}
                  type="button"
                  onClick={() => {
                    onClickIssueType(item);
                  }}
                >
                  <img src={src} alt={item.slug} />
                  {item.name}
                </button>
              );
            })}
          </div>
        )}
        {taskInfo.id}
      </div>
      <div className={style.headerRight}>
        <div ref={myRef} className={style.deleteSection}>
          {visible ? (
            <div className={style.dropdown}>
              <div className={style.menuOpen}>
                <RiMoreFill onClick={handleClickOutside} />
              </div>
              <div className={style.delete}>
                <button
                  type="button"
                  onClick={() => {
                    deleteTask();
                    handleClickOutside();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className={checkAccess('delete:tasks', projectId) ? style.menuClose : ''}>
              {checkAccess('delete:tasks', projectId) && (
                <RiMoreFill onClick={handleClickOutside} />
              )}
            </div>
          )}
        </div>
        <button type="button" onClick={updateIsViewTask}>
          <svg viewBox="0 0 24 24" role="presentation">
            <path
              d="M12 10.586L6.707 5.293a1 1 0 00-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 001.414 1.414L12 13.414l5.293 5.293a1 1 0 001.414-1.414L13.414 12l5.293-5.293a1 1 0 10-1.414-1.414L12 10.586z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
