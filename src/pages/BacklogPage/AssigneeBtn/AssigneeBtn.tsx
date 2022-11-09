/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import styles from './AssigneeBtn.module.scss';
import IconButton from '../../../components/Button/IconButton/IconButton';
import userAvatar from '../../../assets/userAvatar.png';

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
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
  const [query, setQuery] = useState('');
  const assigneeContainerRef = useRef<HTMLDivElement | null>(null);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        showAssigneeDropdown &&
        !assigneeContainerRef.current?.contains(e.target as HTMLElement)
      ) {
        setShowAssigneeDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showAssigneeDropdown]);

  return (
    <div className={styles.assigneeContainer} ref={assigneeContainerRef}>
      <IconButton
        overrideStyle={styles.assignee}
        icon={<img src={assignee ? assignee.avatarIcon : userAvatar} alt="avatar" />}
        tooltip={assignee ? assignee.name : 'Unassigned'}
        onClick={() => {
          setShowAssigneeDropdown(!showAssigneeDropdown);
        }}
      />
      {showAssigneeDropdown && (
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
                        setShowAssigneeDropdown(false);
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
