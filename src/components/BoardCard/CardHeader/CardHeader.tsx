import React from 'react';
import { RiMoreFill } from 'react-icons/ri';
import { TaskEntity } from '../../../api/task/entity/task';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import style from './CardHeader.module.scss';

interface Props {
  updateIsViewTask: () => void;
  taskInfo: TaskEntity;
  deleteTask: () => void;
}

export default function CardHeader({ updateIsViewTask, taskInfo, deleteTask }: Props) {
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const handleClickOutside = () => setVisible(!visible);
  return (
    <header className={style.container}>
      <div className={style.headerLeft}>
        <button className={style.storyIcon} type="button">
          <img
            src="https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium"
            alt="Story"
          />
        </button>
        {/* <span>{taskInfo.tag}</span> */}
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
            <div className={style.menuClose}>
              <RiMoreFill onClick={handleClickOutside} />
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
