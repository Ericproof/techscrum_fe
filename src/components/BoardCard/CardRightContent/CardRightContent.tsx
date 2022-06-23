import React, { useState, useEffect, useRef } from 'react';
import { DatePicker } from '@atlaskit/datetime-picker';
import style from './CardRightContent.module.scss';

export default function CardRightContent() {
  const [dateButtonShow, setDateButtonShow] = useState(true);

  const calendar = useRef<HTMLElement>();

  const handleCalendar = () => {};

  const handleDateButtonShow = () => {
    setDateButtonShow(!dateButtonShow);

    if (dateButtonShow === false) {
      handleCalendar();
    }
  };

  useEffect(() => {}, [dateButtonShow]);

  return (
    <div className={style.container}>
      <button type="button" className={style.toDoButton}>
        <span>To Do</span>
        <svg viewBox="0 0 24 24" role="presentation">
          <path
            d="M8.292 10.293a1.009 1.009 0 000 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 000-1.419.987.987 0 00-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 00-1.406 0z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
      </button>
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
            <div>None</div>
          </div>
          <div className={style.dueDate}>
            <div>Due date</div>
            <div>
              {dateButtonShow && (
                <button type="button" className={style.button} onClick={handleDateButtonShow}>
                  None
                </button>
              )}
              {!dateButtonShow && <DatePicker ref={calendar} />}
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
        <span>Created 23 hours ago</span>
        <span>Updated 33 minutes ago</span>
      </div>
    </div>
  );
}
