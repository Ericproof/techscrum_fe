import React, { useState } from 'react';
import styles from '../../../pages/BacklogPage/BacklogPage.module.scss';
import BacklogUserFilterDropdownSelectButton from './BacklogUserFilterDropdownSelectButton/BacklogUserFilterDropdownSelectButton';

interface IBacklogFilterDropdown {
  users: any;
  selectedUsers: any;
  changeSelectedUsers: any;
}

export default function BacklogUserFilterDropdown(props: IBacklogFilterDropdown) {
  const [visible, setVisible] = useState(false);
  const { users, selectedUsers, changeSelectedUsers } = props;

  return (
    <div className={styles.backlogUser} key={users.id}>
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
