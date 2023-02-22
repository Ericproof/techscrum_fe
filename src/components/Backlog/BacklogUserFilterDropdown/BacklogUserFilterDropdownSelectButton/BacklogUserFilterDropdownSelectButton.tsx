import { BiCheckbox, BiCheckboxChecked } from 'react-icons/bi';
import React, { useState } from 'react';
import styles from '../../../../pages/BacklogPage/BacklogPage.module.scss';

interface IBacklogUserFilterDropdownSelectButton {
  user: any;
  selectedUsers: any;
  changeSelectedUsers: any;
}

export default function BacklogUserFilterDropdownSelectButton(
  props: IBacklogUserFilterDropdownSelectButton
) {
  const checkExisting = (users, singleUser) => {
    let isExists = false;
    users.forEach((userInput) => {
      if (userInput.id === singleUser.id) {
        isExists = true;
      }
    });
    return isExists;
  };
  const { user, selectedUsers, changeSelectedUsers } = props;
  const [pressed, setPressed] = useState(checkExisting(selectedUsers, user));
  const onHandleButtonClick = (singleUser, e) => {
    e.preventDefault();
    setPressed((prevState) => !prevState);
    const isExists = checkExisting(selectedUsers, user);
    changeSelectedUsers(isExists, singleUser);
  };

  return (
    <button
      key={user.id}
      className={styles.backlogRestUsersSelectButton}
      onClick={(e) => {
        onHandleButtonClick(user, e);
      }}
    >
      <div className={styles.backlogRestUsersDropdownDetailContainer}>
        <div className={styles.backlogCheckBox}>
          {pressed ? (
            <BiCheckboxChecked className={styles.backlogCheckBoxIcon} />
          ) : (
            <BiCheckbox className={styles.backlogCheckBoxIcon} />
          )}
        </div>
        <img
          className={styles.backlogRestUsersDropdownAvatar}
          src={user.avatarIcon}
          alt={user.name}
        />
        <div className={styles.backlogRestUsersDropdownName}>{user.name}</div>
      </div>
    </button>
  );
}
