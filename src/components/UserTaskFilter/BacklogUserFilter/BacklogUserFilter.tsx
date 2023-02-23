import React, { useState } from 'react';
import styles from '../UserTaskFilter.module.scss';

interface IBacklogFilter {
  user: any;
  selectedUsers: any;
  changeSelectedUsers: any;
}

export default function BacklogUserFilter(props: IBacklogFilter) {
  const { user, selectedUsers, changeSelectedUsers } = props;
  const [pressed, setPressed] = useState(false);

  const handleUserFilterSelect = () => {
    setPressed((prevState) => !prevState);
    let isExists = false;
    selectedUsers.forEach((selectedUser) => {
      if (selectedUser.id === user.id) {
        isExists = true;
      }
    });
    changeSelectedUsers(isExists, user);
  };

  return (
    <div className={styles.backlogUser} key={user.id}>
      <button className={styles.backlogUserIconButton} onClick={handleUserFilterSelect}>
        <div className={styles.backlogUserIconContainer} data-tooltip={user.name}>
          {pressed ? (
            <img
              className={styles.backlogUserIconWithBorder}
              src={user.avatarIcon}
              alt={user.name}
            />
          ) : (
            <img className={styles.backlogUserIcon} src={user.avatarIcon} alt={user.name} />
          )}
        </div>
      </button>
    </div>
  );
}
