import React, { useEffect, useState } from 'react';
import { getUsers } from '../../../../api/user/user';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import { IOnChangeProjectLead } from '../../../../types';

import styles from './UserSelect.module.scss';

interface IUserSelect {
  onChange: (e: IOnChangeProjectLead) => void;
  value: any;
  allowEdit: boolean;
}

export default function UserSelect(props: IUserSelect) {
  const { onChange, value, allowEdit = true } = props;
  const [userList, setUserList] = useState<any>([]);
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

  const onClickUser = (user: string) => {
    onChange({ target: { name: 'projectLeadId', value: user } });
    setVisible(false);
  };

  return (
    <div ref={myRef} className={styles.leadDropdownMenu}>
      <div className={styles.leadDropdownContainer}>
        {visible && allowEdit ? (
          <div className={styles.leadDropdownOpen}>
            <div className={styles.leadInputField}>
              <img
                className={styles.userAvatar}
                src={
                  value?.avatarIcon ||
                  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
                }
                alt="avatar"
              />
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
                        onClickUser(user);
                      }}
                    >
                      <img
                        src={
                          user.avatarIcon ||
                          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
                        }
                        alt="avatar"
                      />
                      <span>{user.userName ?? user.name}</span>
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
                value?.avatarIcon ||
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
              }
              alt="avatar"
            />
            <span>{value?.name}</span>
          </button>
        )}
      </div>
    </div>
  );
}
