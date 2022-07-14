import React, { useState } from 'react';
import { DatePicker } from '@atlaskit/datetime-picker';
import { TaskEntity } from '../../../api/task/entity/task';
import { IColumnsFromBackend } from '../../../types';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import style from './CardRightContent.module.scss';

interface Props {
  taskInfo: TaskEntity;
  columnsInfo: IColumnsFromBackend;
  taskStatusOnchange: (taskInfo: TaskEntity) => void;
}

export default function CardRightContent({ columnsInfo, taskInfo, taskStatusOnchange }: Props) {
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const handleClickOutside = () => setVisible(true);

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

  const dateWithDay = (d: Date | null) => {
    if (d != null) {
      const date = d.toString().split('T')[0];
      const dateDataArray = date.split('-');
      return `${dateDataArray[1]}-${dateDataArray[2]}-${dateDataArray[0]}`;
    }
    return '';
  };

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

  return (
    <div className={style.container}>
      <div ref={myRef} className={style.statusSection}>
        {visible ? (
          <>
            <button type="button" className={style.toDoButton} onClick={handleClickOutside}>
              <span>{columnsInfo[taskInfo.statusId?.toString() ?? '0'].name}</span>
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
                          updatedTaskInfo.statusId = Number(id);
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
            <span>{columnsInfo[taskInfo.statusId?.toString() ?? '0'].name}</span>
            <svg viewBox="0 0 24 24" role="presentation">
              <path
                d="M8.292 10.293a1.009 1.009 0 000 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 000-1.419.987.987 0 00-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 00-1.406 0z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      <div className={style.box}>
        <div className={style.detail}>
          <span>Detail</span>
          <button type="button">
            <svg viewBox="0 0 24 24" role="presentation">
              <path
                d="M11.221 9.322l-2.929 2.955a1.009 1.009 0 000 1.419.986.986 0 001.405 0l2.298-2.317 2.307 2.327a.989.989 0 001.407 0 1.01 1.01 0 000-1.419l-2.94-2.965A1.106 1.106 0 0011.991 9c-.279 0-.557.107-.77.322z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className={style.boxBody}>
          <div className={style.checkList}>
            <div>Develop CheckList</div>
            <div>None</div>
          </div>
          <div className={style.assignee}>
            <div>Assignee</div>
            <div>
              <span className={style.icon} />
              <div className={style.roleName}>Evan Lin</div>
            </div>
          </div>
          <div className={style.labels}>
            <div>Labels</div>
            <div>None</div>
          </div>
          <div className={style.sprint}>
            <div>Sprint</div>
            <div>TEC Sprint 6</div>
          </div>
          <div className={style.storyPoint}>
            <div>Story Point estimate</div>
            <div>{taskInfo.storyPoint}</div>
          </div>
          <div className={style.dueDate}>
            <div>Due date</div>
            <div>
              <DatePicker
                dateFormat="MM-DD-YYYY"
                placeholder={dateWithDay(taskInfo.dueAt ?? null)}
                defaultValue={dateWithDay(taskInfo.dueAt ?? null)}
                onChange={(date) => {
                  const updatedTaskInfo = { ...taskInfo };
                  updatedTaskInfo.dueAt = new Date(date);
                  taskStatusOnchange(updatedTaskInfo);
                }}
              />
            </div>
          </div>
          <div className={style.reporter}>
            <div>Reporter</div>
            <div>
              <span className={style.icon} />
              <div className={style.roleName}>Evan Lin</div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.createAndUpdateDate}>
        <span>Created {dateWithTimestamp(taskInfo.createdAt ?? null)}</span>
        <span>Updated {dateWithTimestamp(taskInfo.updatedAt ?? null)}</span>
      </div>
    </div>
  );
}
