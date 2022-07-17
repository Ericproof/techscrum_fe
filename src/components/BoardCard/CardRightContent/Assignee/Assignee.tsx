import React, { useState } from 'react';
import userAvatar from '../../../../assets/userAvatar.png';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import { IOnChangeTaskAssignee } from '../../../../types';
import styles from './Assignee.module.scss';

interface ITaskRelator {
  assigneeOnchangeEventHandler: (e: IOnChangeTaskAssignee) => void;
}

const users = [
  {
    id: '1',
    avatar: userAvatar,
    name: 'Unassigned'
  },
  {
    id: '2',
    avatar: userAvatar,
    name: 'Automatic'
  },
  {
    id: '3',
    avatar:
      'https://i2.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/YK-3.png?ssl=1',
    name: 'Yiu Kitman'
  },
  {
    id: '4',
    avatar:
      'https://i2.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/E-0.png?ssl=1',
    name: 'Emil'
  },
  {
    id: '5',
    avatar:
      'https://i2.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/BW-1.png?ssl=1',
    name: 'Belinda Wang'
  },
  {
    id: '6',
    avatar:
      'https://i2.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/EL-3.png?ssl=1',
    name: 'Evan Lin'
  }
];

export default function Assignee(props: ITaskRelator) {
  const { assigneeOnchangeEventHandler } = props;
  const [userInfo, setUserInfo] = useState(users[0]);
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const handleClickOutside = () => setVisible(true);
  return (
    <div ref={myRef} className={styles.assignee}>
      <div>Assignee</div>
      <div className={styles.leadDropdownContainer}>
        {visible ? (
          <div className={styles.leadDropdownOpen}>
            <div className={styles.leadInputField}>
              <img className={styles.userAvatar} src={userInfo.avatar} alt="avatar" />
              <span>{userInfo.name}</span>
              <button className={styles.optionToggle} type="button" onClick={handleClickOutside}>
                <i role="button" aria-label="openDropdown" tabIndex={0} />
              </button>
            </div>
            <div className={styles.leadMenu}>
              <ul>
                {users.map((user) => (
                  <li key={user.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setUserInfo({ id: user.id, avatar: user.avatar, name: user.name });
                        assigneeOnchangeEventHandler({ target: { id: user.id } });
                        setVisible(false);
                      }}
                    >
                      <img src={user.avatar} alt="avatar" />
                      <span>{user.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <button className={styles.leadInputClose} type="button" onClick={handleClickOutside}>
            <img src={userInfo.avatar} alt="avatar" />
            <span>{userInfo.name}</span>
          </button>
        )}
      </div>
    </div>
  );
}
