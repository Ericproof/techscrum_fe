import React, { useState } from 'react';
import { RiMoreFill } from 'react-icons/ri';
import ProjectEditor from '../../components/ProjectEditor/ProjectEditor';
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
        <ProjectEditor />
      </div>
    </div>
  );
}
