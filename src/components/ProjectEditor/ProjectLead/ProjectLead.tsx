import React, { useState } from 'react';
import userAvatar from '../../../assets/userAvatar.png';
import UseOutsideAlerter from '../../OutsideAlerter/OutsideAlerter';
import styles from './ProjectLead.module.scss';

export default function ProjectLead() {
  const users = [
    { id: 1, avatar: 'https://picsum.photos/50', name: 'Yiu Kitman' },
    { id: 2, avatar: 'https://picsum.photos/50', name: 'Emil' },
    { id: 3, avatar: 'https://picsum.photos/50', name: 'Belinda Wang' },
    { id: 4, avatar: 'https://picsum.photos/50', name: 'Andy' }
  ];
  const [userInfo, setUserInfo] = useState(users[0]);
  const { visible, setVisible, myRef } = UseOutsideAlerter(false);
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
