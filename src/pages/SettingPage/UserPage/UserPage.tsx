import React, { useContext, useState } from 'react';
import { updateMe } from '../../../api/user/user';
import ChangeIcon from '../../../components/ProjectEditor/ChangeIcon/ChangeIcon';
import ProjectHeader from '../../../components/ProjectHeader/ProjectHeader';
import { UserContext, UserDispatchContext } from '../../../context/UserInfoProvider';
import { IProject } from '../../../types';
// import icon from './pic.jpg';

import styles from './UserPage.module.scss';

export default function UserPage() {
  const [projectList, setProjectList] = useState<IProject[]>([]);
  const [value, setValue] = useState(0);
  const [isCreateNewCard, setIsCreateNewCard] = useState(false);
  const userInfo = useContext(UserContext);
  const setUserInfo = useContext(UserDispatchContext);
  const getProjectFromChildren = (id: number) => {
    projectList[id].star = !projectList[id].star;
    setValue(value + 1);
  };
  const getCreateNewCardStateFromChildren = () => {
    setIsCreateNewCard(!isCreateNewCard);
  };

  const onChangeUser = (e: any) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onSaveMe = () => {
    if (!userInfo.token) {
      return;
    }
    updateMe(
      {
        name: userInfo.name,
        avatarIcon: userInfo?.avatarIcon,
        userName: userInfo.userName,
        abbreviation: userInfo.abbreviation
      },
      userInfo.token
    );
  };

  return (
    <>
      <ProjectHeader
        updateProject={getProjectFromChildren}
        updateIsCreateNewCard={getCreateNewCardStateFromChildren}
      />
      <div className={styles.userPage}>
        <div className={styles.userBar}>
          <h2>About</h2>
        </div>
        <div className={styles.userForm}>
          <div className={styles.userInfo}>
            <form>
              <div className={styles.userInput}>
                <label htmlFor="Name">
                  Full Name
                  <br />
                  <input
                    className={styles.proIcon}
                    name="name"
                    value={userInfo.name}
                    onChange={onChangeUser}
                  />
                </label>
              </div>
              <div className={styles.userInput}>
                <label htmlFor="abbreviation">
                  Abbreviation
                  <br />
                  <input
                    className={styles.proIcon}
                    name="abbreviation"
                    value={userInfo.abbreviation}
                    onChange={onChangeUser}
                  />
                </label>
              </div>
              <div className={styles.userInput}>
                <label htmlFor="userName">
                  Username
                  <br />
                  <input
                    className={styles.proIcon}
                    name="userName"
                    value={userInfo.userName}
                    onChange={onChangeUser}
                  />
                </label>
              </div>
              <input className={styles.submit} type="button" value="Save" onClick={onSaveMe} />
            </form>
          </div>
          <div className={styles.userIcon}>
            <div className={styles.picBorder}>
              <h2>Photo</h2>
              <ChangeIcon
                value={
                  userInfo?.avatarIcon ||
                  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
                }
                uploadSuccess={(photoData: any) => {
                  onChangeUser({ target: { name: 'avatarIcon', value: photoData[0].location } });
                }}
              />
            </div>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
