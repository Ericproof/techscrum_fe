/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { grey } from '@mui/material/colors';
import styles from './Assignee.module.scss';

function Assignee() {
  const assignees = [
    { id: 1, state: 'Project lead' },
    { id: 2, state: 'Unassigned' }
  ];
  const [toggle, setToggle] = useState(false);
  const [assignState, setAssignState] = useState(assignees[0]);
  return (
    <div className={styles.assigneeDropdownMenu}>
      <label htmlFor="defaultAssignee">
        <span> Default assignee</span>
        <div className={styles.assigneeContainer}>
          {toggle ? (
            <div className={styles.assigneeDropdownOpen}>
              <div className={styles.assigneeMenu}>
                <ul>
                  {assignees.map((assignee) => (
                    <li
                      onClick={() => {
                        setAssignState({ id: assignee.id, state: assignee.state });
                        setToggle(false);
                      }}
                      key={assignee.id}
                    >
                      <span>{assignee.state}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.assigneeInputField}>
                <input type="Text" placeholder={assignState.state} id="defaultAssignee" />
                <KeyboardArrowDownIcon
                  sx={{ color: grey[700], fontSize: 24 }}
                  onClick={() => setToggle(false)}
                />
              </div>
            </div>
          ) : (
            <div className={styles.assigneeDropdownClose}>
              <div className={styles.assigneeInputClose}>
                <span>{assignState.state}</span>
                <KeyboardArrowDownIcon
                  sx={{ color: grey[700], fontSize: 24 }}
                  onClick={() => setToggle(true)}
                />
              </div>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}

export default Assignee;
