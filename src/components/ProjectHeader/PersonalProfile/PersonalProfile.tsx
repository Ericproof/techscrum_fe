import React from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import styles from './PersonalProfile.module.scss';
import UseOutsideAlerter from '../../OutsideAlerter/OutsideAlerter';

const users = [
  {
    id: 0,
    name: 'Yiu Kitman',
    avatar:
      'https://i2.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/YK-3.png?ssl=1'
  }
];
export default function PersonalProfile() {
  const { visible, setVisible, myRef } = UseOutsideAlerter(false);
  const handleClickOutside = () => setVisible(true);
  return (
    <div ref={myRef}>
      {users.map((user) => (
        <div className={styles.rightSection} key={user.id}>
          {visible ? (
            <>
              <div className={styles.avatarSection}>
                <button type="button" onClick={handleClickOutside}>
                  <div className={styles.avatarContent}>
                    <span>
                      <img src={user.avatar} alt="avatar" />
                    </span>
                  </div>
                </button>
              </div>
              <div className={styles.settingDropdown}>
                <div className={styles.settingContainer}>
                  <div className={styles.settingContent}>
                    <div className={styles.settingTop} />
                    <div className={styles.settingDetails}>
                      <div className={styles.detail}>
                        <div className={styles.name}>{user.name}</div>
                        <a href="/user-page">
                          <div className={styles.title}>
                            <span>Profile</span>
                          </div>
                        </a>
                        <a href="/#">
                          <div className={styles.title}>
                            <span>Accounting settings</span>
                          </div>
                          <div className={styles.iconSection}>
                            <div className={styles.icon}>
                              <BsBoxArrowUpRight />
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className={styles.settingBottom}>
                      <a href="/#" className={styles.logOutSection}>
                        <div className={styles.logOutContainer}>
                          <span>Log out</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.avatarSection}>
              <button type="button" onClick={handleClickOutside}>
                <div className={styles.avatarContent}>
                  <span>
                    <img src={user.avatar} alt="avatar" />
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
