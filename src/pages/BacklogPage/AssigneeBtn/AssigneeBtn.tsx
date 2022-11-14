import React, { useState } from 'react';
import styles from './AssigneeBtn.module.scss';
import IconButton from '../../../components/Button/IconButton/IconButton';
import userAvatar from '../../../assets/userAvatar.png';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import { IUserInfo, IAssign } from '../../../types';

interface IPriorityBtn {
  assignee: IAssign | null;
  onClickChangeAssignee: (id: string, assigneeId: string) => void;
  taskId: string;
  userList: IUserInfo[];
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

  let name = 'Unassigned';
  let avartar = userAvatar;
  if (assignee) {
    if (assignee.name) {
      name = assignee.name;
    }
    if (assignee.avatarIcon) {
      avartar = assignee.avatarIcon;
    }
  }

  return (
    <div className={styles.assigneeContainer} ref={myRef}>
      <IconButton
        overrideStyle={styles.assignee}
        icon={<img src={avartar} alt="avatar" />}
        tooltip={name}
        onClick={() => {
          setVisible(!visible);
        }}
      />
      {visible && (
        <div className={styles.assigneeDropdown}>
          <div className={styles.inputContainer}>
            <input type="text" placeholder={name} onChange={onChangeInput} />
            <img src={avartar} alt="avatar" />
          </div>
          <ul className={styles.assigneeDropdownList}>
            {userList
              .filter((user: IUserInfo) => {
                return user.name && user.name.toLowerCase().includes(query.toLowerCase());
              })
              .map((user) => {
                return (
                  <li key={user.id}>
                    <button
                      onClick={() => {
                        if (user.id) {
                          onClickChangeAssignee(taskId, user.id);
                        }
                        setQuery('');
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
