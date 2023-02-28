import React from 'react';
import styles from './UserTaskFilter.module.scss';
import BacklogUserFilter from './BacklogUserFilter/BacklogUserFilter';
import BacklogUserFilterDropdown from './BacklogUserFilterDropdown/BacklogUserFilterDropdown';

interface IUserTaskFilter {
  selectedUsers: any;
  changeSelectedUsers: any;
  userList: any;
}

export default function userTaskFilter(props: IUserTaskFilter) {
  const { selectedUsers, changeSelectedUsers, userList } = props;
  return (
    <div className={styles.BacklogFilterArea}>
      {userList.slice(0, 4).map((user) => (
        <BacklogUserFilter
          selectedUsers={selectedUsers}
          changeSelectedUsers={changeSelectedUsers}
          key={user.id}
          user={user}
        />
      ))}
      {userList.length > 4 && (
        <BacklogUserFilterDropdown
          selectedUsers={selectedUsers}
          changeSelectedUsers={changeSelectedUsers}
          users={userList.slice(4)}
        />
      )}
    </div>
  );
}
