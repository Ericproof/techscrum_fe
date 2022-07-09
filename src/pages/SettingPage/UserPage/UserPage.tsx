import React, { useState } from 'react';
import { ImEarth } from 'react-icons/im';
import ProjectHeader from '../../../components/ProjectHeader/ProjectHeader';
import { IProject } from '../../../types';
// import icon from './pic.jpg';

import styles from './UserPage.module.scss';

export default function UserPage() {
  const [projectList, setProjectList] = useState<IProject[]>([]);
  const [value, setValue] = useState(0);
  const [isCreateNewCard, setIsCreateNewCard] = useState(false);
  const getProjectFromChildren = (id: number) => {
    projectList[id].star = !projectList[id].star;
    setValue(value + 1);
  };
  const getCreateNewCardStateFromChildren = () => {
    setIsCreateNewCard(!isCreateNewCard);
  };

  const fetchNewCard = () => {
    getCreateNewCardStateFromChildren();
  };

  return (
    <>
      <ProjectHeader
        projects={projectList}
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
              <p className={styles.public}>
                <ImEarth /> &nbsp; Public
              </p>
              <div className={styles.userInput}>
                <label htmlFor="Name">
                  Full Name
                  <br />
                  <input className={styles.proIcon} id="name" />
                </label>
              </div>
              <p className={styles.public}>
                <ImEarth /> &nbsp; Public
              </p>
              <div className={styles.userInput}>
                <label htmlFor="abbName">
                  Abbreviation
                  <br />
                  <input className={styles.proIcon} id="abbName" />
                </label>
              </div>
              <p className={styles.public}>
                <ImEarth /> &nbsp; Public
              </p>
              <div className={styles.userInput}>
                <label htmlFor="userName">
                  Username
                  <br />
                  <input className={styles.proIcon} id="userName" />
                </label>
              </div>
              <p className={styles.public}>
                <ImEarth /> &nbsp; Public
              </p>
              <div className={styles.userInput}>
                <label htmlFor="file">
                  Personal File
                  <br />
                  <textarea name="subject" id="file" />
                </label>
              </div>
              <input className={styles.submit} type="submit" value="Save" />
            </form>
          </div>
          <div className={styles.userIcon}>
            <h2>Photo</h2>
            <div className={styles.picBorder}>
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                alt="icon"
              />
            </div>
            <p className={styles.iconPublic}>
              <ImEarth /> &nbsp; Public
            </p>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
