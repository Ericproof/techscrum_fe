import React, { useState } from 'react';
import styles from './AssigneeBtn.module.scss';
import IconButton from '../../../components/Button/IconButton/IconButton';
import userAvatar from '../../../assets/userAvatar.png';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';

interface IPriorityBtn {
  assignee: any;
  onClickChangeAssignee: (id: string, assigneeId: string) => void;
  taskId: string;
  userList: any;
}
export default function PriorityBtn({
  assignee,
  onClickChangeAssignee,
  userList,
  taskId
}: IPriorityBtn) {
  const [query, setQuery] = useState('');

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const { visible, setVisible, myRef } = useOutsideAlerter(false);

  return (
    <div className={styles.assigneeContainer} ref={myRef}>
      <IconButton
        overrideStyle={styles.assignee}
        icon={<img src={assignee ? assignee.avatarIcon : userAvatar} alt="avatar" />}
        tooltip={assignee ? assignee.name : 'Unassigned'}
        onClick={() => {
          setVisible(!visible);
        }}
      />
      {visible && (
        <div className={styles.assigneeDropdown}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder={assignee ? assignee.name : 'Unassigned'}
              onChange={onChangeInput}
            />
            <img src={assignee ? assignee.avatarIcon : userAvatar} alt="avatar" />
          </div>
          <ul className={styles.assigneeDropdownList}>
            {userList
              .filter((user) => {
                return user.name.toLowerCase().includes(query.toLowerCase());
              })
              .map((user) => {
                return (
                  <li key={user.id}>
                    <button
                      onClick={() => {
                        onClickChangeAssignee(taskId, user.id);
                        setVisible(false);
                      }}
                    >
                      <img src={user.avatarIcon} alt="avatar" />
                      {user.name}
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
}
