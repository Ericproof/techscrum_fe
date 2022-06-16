import React, { useState } from 'react';
import { RiMoreFill } from 'react-icons/ri';
import ProjectLead from '../../components/ProjectEditor/ProjectLead/ProjectLead';
import Assignee from '../../components/ProjectEditor/Assignee/Assignee';
import ChangeIcon from '../../components/ProjectEditor/ChangeIcon/ChangeIcon';
import ChangeName from '../../components/ProjectEditor/ChangeName/ChangeName';
import ChangeKey from '../../components/ProjectEditor/ChangeKey/ChangeKey';
import styles from './Setting.module.scss';

export default function Setting() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className={styles.settingPage}>
      <div className={styles.settingContent}>
        <div className={styles.nav}>
          <div className={styles.navContent}>
            <ul>
              <li>
                <a href="http://scrummaster.kitmanyiu.com/" target="_self">
                  <span>Projects</span>
                </a>
              </li>
              <li>
                <a href="http://scrummaster.kitmanyiu.com/" target="_self">
                  <span>Project name</span>
                </a>
              </li>
              <li>
                <a href="http://scrummaster.kitmanyiu.com/settings" target="_self">
                  <span>Project settings</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <header>
          <h1>Details</h1>
          {toggle ? (
            <div className={styles.openTrash}>
              <div className={styles.menuOpen}>
                <RiMoreFill onClick={() => setToggle(false)} />
              </div>
              <div className={styles.trash}>
                <button type="button">Move to trash</button>
              </div>
            </div>
          ) : (
            <div className={styles.menuClose}>
              <RiMoreFill onClick={() => setToggle(true)} />
            </div>
          )}
        </header>
        <div className={styles.editSection}>
          <div className={styles.editContainer}>
            <form>
              <ChangeIcon />
              <ChangeName />
              <ChangeKey />
              <ProjectLead />
              <Assignee />
              <button className={styles.saveBtn} type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
