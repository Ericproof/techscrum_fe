import React from 'react';
import styles from './PriorityBtn.module.scss';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';

interface IPriorityBtn {
  priority: string;
  onClickChangePriority: (id: string, priority: string) => void;
  taskId: string;
  showDropDownOnTop?: boolean;
}
export default function PriorityBtn({
  priority,
  onClickChangePriority,
  taskId,
  showDropDownOnTop
}: IPriorityBtn) {
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

  const currentPriorityBtn = allPriorities.find(
    (eachPriority) => eachPriority.priority === priority
  );

  const { visible, setVisible, myRef } = useOutsideAlerter(false);

  const onClickPriorityBtnDropDown = (eachPriority: { priority: string; imgUrl: string }) => {
    onClickChangePriority(taskId, eachPriority.priority);
    setVisible(false);
  };

  return (
    <div className={styles.priorityBtnContainer} ref={myRef}>
      <button
        className={
          visible ? [styles.priorityBtn, styles.priorityBtnOutline].join(' ') : styles.priorityBtn
        }
        onClick={() => {
          setVisible(!visible);
        }}
        data-testid={`priority-btn-${taskId}`}
      >
        <img src={currentPriorityBtn?.imgUrl} alt="" />
      </button>
      <div
        className={
          visible
            ? [
                styles.priorityBtnDropDown,
                styles.showPriorityBtnDropDown,
                showDropDownOnTop && styles.showDropDownOnTop
              ].join(' ')
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
                    data-testid={`priority-dropdown-btn-${taskId}-${eachPriority.priority}`}
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
PriorityBtn.defaultProps = {
  showDropDownOnTop: false
};
