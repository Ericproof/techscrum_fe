import React, { useEffect, useRef, useState } from 'react';
import styles from '../UserTaskFilter.module.scss';
import BacklogUserFilterDropdownSelectButton from './BacklogUserFilterDropdownSelectButton/BacklogUserFilterDropdownSelectButton';

interface IBacklogFilterDropdown {
  users: any;
  selectedUsers: any;
  changeSelectedUsers: any;
}

export default function BacklogUserFilterDropdown(props: IBacklogFilterDropdown) {
  const [visible, setVisible] = useState(false);
  const { users, selectedUsers, changeSelectedUsers } = props;
  const myRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (myRef.current !== null && !myRef.current.contains(target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });

  return (
    <div className={styles.backlogUser} key={users.id} ref={myRef}>
      <button
        className={styles.backlogUserIconButton}
        onClick={() => {
          setVisible((prevState) => !prevState);
        }}
      >
        <div className={styles.backlogRestUsers}>+{users.length}</div>
      </button>
      {visible && (
        <div className={styles.backlogRestUsersDropdownContainer}>
          {users.map((user) => (
            <BacklogUserFilterDropdownSelectButton
              selectedUsers={selectedUsers}
              changeSelectedUsers={changeSelectedUsers}
              key={user.id}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  );
}
