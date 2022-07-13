import React, { useContext } from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import styles from './PersonalProfile.module.scss';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import { UserContext } from '../../../context/UserInfoProvider';
import avatarImg from '../../../assets/userAvatar.png';

export default function PersonalProfile() {
  const user = useContext(UserContext);

  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const handleClickOutside = (state: boolean) => setVisible(!state);
  return (
    <div ref={myRef}>
      <div className={styles.rightSection} key={user.id}>
        {visible ? (
          <>
            <div className={styles.avatarSection}>
              <button type="button" onClick={() => handleClickOutside(true)}>
                <div className={styles.avatarContent}>
                  <span>
                    <img src={avatarImg} alt="avatar" />
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
                      <a href="/user-page">
                        <div className={styles.title}>
                          <span>Profile</span>
                        </div>
                      </a>
                      <a href="/#">
                        <div className={styles.title}>
                          <span>Account settings</span>
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
            <button type="button" onClick={() => handleClickOutside(false)}>
              <div className={styles.avatarContent}>
                <span>
                  <img src={avatarImg} alt="avatar" />
                </span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
