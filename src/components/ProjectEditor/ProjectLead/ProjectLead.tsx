import React, { useEffect, useState } from 'react';
import { getUsers } from '../../../api/user/user';
import userAvatar from '../../../assets/userAvatar.png';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import { IOnChangeProjectLead } from '../../../types';
import styles from './ProjectLead.module.scss';

interface IProjectLead {
  onChange: (e: IOnChangeProjectLead) => void;
}

export default function ProjectLead(props: IProjectLead) {
  const { onChange } = props;
  const [userList, setUserList] = useState<any>([]);
  const [userInfo, setUserInfo] = useState<any>(null);
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const handleClickOutside = () => setVisible(true);

  useEffect(() => {
    const getUsersList = () => {
      getUsers().then((res) => {
        setUserList(res.data);
      });
    };
    getUsersList();
  }, []);

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
                  {userList.map((user: any) => (
                    <li key={user.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setUserInfo({ id: user.id, avatar: user.avatar, name: user.name });
                          onChange({ target: { name: 'projectLeadId', value: user.id } });
                          setVisible(false);
                        }}
                      >
                        <img
                          src={
                            user.avatar ||
                            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
                          }
                          alt="avatar"
                        />
                        <span>{user.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <button className={styles.leadInputClose} type="button" onClick={handleClickOutside}>
              <img
                src={
                  userInfo?.avatar ||
                  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
                }
                alt="avatar"
              />
              <span>{userInfo?.name}</span>
            </button>
          )}
        </div>
      </label>
      <p>Make sure your project lead has access to issues in the project.</p>
    </div>
  );
}
