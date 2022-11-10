import React, { useState, useRef, useEffect } from 'react';
import styles from './PriorityBtn.module.scss';

interface IPriorityBtn {
  priority: string;
  onClickChangePriority: (id: string, priority: string) => void;
  id: string;
}
export default function PriorityBtn({ priority, onClickChangePriority, id }: IPriorityBtn) {
  const allPriorities = [
    {
      priority: 'Highest',
      imgUrl: 'https://010001.atlassian.net/images/icons/priorities/highest.svg'
    },
    { priority: 'High', imgUrl: 'https://010001.atlassian.net/images/icons/priorities/high.svg' },
    {
      priority: 'Medium',
      imgUrl: 'https://010001.atlassian.net/images/icons/priorities/medium.svg'
    },
    { priority: 'Low', imgUrl: 'https://010001.atlassian.net/images/icons/priorities/low.svg' },
    {
      priority: 'Lowest',
      imgUrl: 'https://010001.atlassian.net/images/icons/priorities/lowest.svg'
    }
  ];

  const [showPriorityBtnDropDown, setShowPriorityBtnDropDown] = useState(false);
  const [showPriorityBtnOutline, setShowPriorityBtnOutline] = useState(false);
  const currentPriorityBtn = allPriorities.find(
    (eachPriority) => eachPriority.priority === priority
  );

  const priorityBtnContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        showPriorityBtnDropDown &&
        showPriorityBtnOutline &&
        !priorityBtnContainerRef?.current?.contains(e.target)
      ) {
        setShowPriorityBtnDropDown(false);
        setShowPriorityBtnOutline(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPriorityBtnDropDown, showPriorityBtnOutline]);
  const onClickPriorityBtnDropDown = (eachPriority: { priority: string; imgUrl: string }) => {
    onClickChangePriority(id, eachPriority.priority);
    setShowPriorityBtnDropDown(false);
    setShowPriorityBtnOutline(false);
  };

  return (
    <div className={styles.priorityBtnContainer} ref={priorityBtnContainerRef}>
      <button
        className={
          showPriorityBtnOutline
            ? [styles.priorityBtn, styles.priorityBtnOutline].join(' ')
            : styles.priorityBtn
        }
        onClick={() => {
          setShowPriorityBtnDropDown(!showPriorityBtnDropDown);
          setShowPriorityBtnOutline(!showPriorityBtnOutline);
        }}
        data-testid={`priority-btn-${id}`}
      >
        <img src={currentPriorityBtn?.imgUrl} alt="" />
      </button>
      <div
        className={
          showPriorityBtnDropDown
            ? [styles.priorityBtnDropDown, styles.showPriorityBtnDropDown].join(' ')
            : styles.priorityBtnDropDown
        }
      >
        <ul>
          {allPriorities
            .filter((eachPriority) => eachPriority.priority !== currentPriorityBtn?.priority)
            .map((eachPriority) => {
              return (
                <li key={eachPriority.priority}>
                  <button
                    className={styles.priorityDropDownBtn}
                    onClick={() => {
                      onClickPriorityBtnDropDown(eachPriority);
                    }}
                    data-testid={`priority-dropdown-btn-${id}-${eachPriority.priority}`}
                  >
                    <img src={eachPriority.imgUrl} alt={eachPriority.priority} />
                    <p>{eachPriority.priority}</p>
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
