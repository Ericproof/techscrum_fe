/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import userAvatar from '../../../assets/userAvatar.png';
import styles from './ProjectLead.module.scss';

function ProjectLead() {
  const users = [
    { id: 1, avatar: 'https://picsum.photos/50', name: 'Yiu Kitman' },
    { id: 2, avatar: 'https://picsum.photos/50', name: 'Emil' },
    { id: 3, avatar: 'https://picsum.photos/50', name: 'Belinda Wang' }
  ];
  const [toggle, setToggle] = useState(false);
  const [userInfo, setUserInfo] = useState(users[0]);
  return (
    <div className={styles.leadDropdownMenu}>
      <label htmlFor="projectLead">
        <span> Project lead</span>
        <div className={styles.leadDropdownContainer}>
          {toggle ? (
            <div className={styles.leadDropdownOpen}>
              <div className={styles.leadInputField}>
                <img className={styles.userAvatar} src={userAvatar} alt="avatar" />
                <input dir="auto" type="Text" />
                <i
                  role="button"
                  aria-label="openDropdown"
                  tabIndex={0}
                  onClick={() => setToggle(false)}
                />
              </div>
              <div className={styles.leadMenu}>
                <ul>
                  {users.map((user) => (
                    <li
                      onClick={() => {
                        setUserInfo({ id: user.id, avatar: user.avatar, name: user.name });
                        setToggle(false);
                      }}
                    >
                      <img src={user.avatar} alt="avatar" />
                      <span>{user.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className={styles.leadDropdownClose}>
              <div
                className={styles.leadInputClose}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setToggle(true);
                }}
              >
                <img src={userInfo.avatar} alt="avatar" />
                <span>{userInfo.name}</span>
              </div>
            </div>
          )}
        </div>
      </label>
      <p>Make sure your project lead has access to issues in the project.</p>
    </div>
  );
}

export default ProjectLead;
