import React, { useState } from 'react';
import userAvatar from '../../../assets/userAvatar.png';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import { IOnChangeProjectLead } from '../../../types';
import styles from './ProjectLead.module.scss';

interface IProjectLead {
  onChange: (e: IOnChangeProjectLead) => void;
}

export default function ProjectLead(props: IProjectLead) {
  const { onChange } = props;
  const users = [
    {
      id: '1',
      avatar:
        'https://i2.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/YK-3.png?ssl=1',
      name: 'Yiu Kitman'
    },
    {
      id: '2',
      avatar:
        'https://i2.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/E-0.png?ssl=1',
      name: 'Emil'
    },
    {
      id: '3',
      avatar:
        'https://i2.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/BW-1.png?ssl=1',
      name: 'Belinda Wang'
    },
    {
      id: '4',
      avatar:
        'https://i2.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/EL-3.png?ssl=1',
      name: 'Evan Lin'
    }
  ];
  const [userInfo, setUserInfo] = useState(users[0]);
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const handleClickOutside = () => setVisible(true);
  return (
    <div ref={myRef} className={styles.leadDropdownMenu}>
      <label htmlFor="projectLead">
        <span> Project lead</span>
        <div className={styles.leadDropdownContainer}>
          {visible ? (
            <div className={styles.leadDropdownOpen}>
              <div className={styles.leadInputField}>
                <img className={styles.userAvatar} src={userAvatar} alt="avatar" />
                <input dir="auto" type="Text" />
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
                          onChange({ target: { name: 'projectLeadId', value: user.id } });
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
      </label>
      <p>Make sure your project lead has access to issues in the project.</p>
    </div>
  );
}
