import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import styles from './Assignee.module.scss';
import UseOutsideAlerter from '../OutsideAlerter';

function Assignee() {
  const assignees = [
    { id: 1, state: 'Project lead' },
    { id: 2, state: 'Unassigned' }
  ];
  const [assignState, setAssignState] = useState(assignees[0]);
  const { visible, setVisible, myRef } = UseOutsideAlerter(false);
  const handleClickOutside = () => setVisible(true);
  return (
    <div ref={myRef} className={styles.assigneeDropdownMenu}>
      <label htmlFor="defaultAssignee">
        <span className={styles.assigneeTitle}> Default assignee</span>
        <div className={styles.assigneeContainer}>
          {visible ? (
            <div className={styles.assigneeDropdownOpen}>
              <div className={styles.assigneeMenu}>
                <ul>
                  {assignees.map((assignee) => (
                    <li>
                      <button
                        type="button"
                        key={(assignee.id, assignee.state)}
                        className={styles.assigneeOptions}
                        onClick={() => {
                          setAssignState({ id: assignee.id, state: assignee.state });
                          setVisible(false);
                        }}
                      >
                        {assignee.state}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.assigneeInputField}>
                <input
                  dir="auto"
                  type="Text"
                  placeholder={assignState.state}
                  id="defaultAssignee"
                />
                <MdKeyboardArrowDown color="#42526E" size="24px" onClick={handleClickOutside} />
              </div>
            </div>
          ) : (
            <div className={styles.assigneeDropdownClose}>
              <div className={styles.assigneeInputClose}>
                <span>{assignState.state}</span>
                <MdKeyboardArrowDown color="#42526E" size="24px" onClick={handleClickOutside} />
              </div>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}

export default Assignee;
