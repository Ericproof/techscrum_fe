import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { grey } from '@mui/material/colors';
import styles from './Setting.module.scss';
import icon from '../../assets/icon.png';
import ProjectLead from './ProjectLead/ProjectLead';
import Assignee from './Assignee/Assignee';

export default function Setting() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className={styles.settingPage}>
      <div className={styles.settingContent}>
        <div className={styles.nav}>
          <div className={styles.navContent}>
            <ul>
              <li>Projects</li>
              <li>Project name</li>
              <li>Project settings</li>
            </ul>
          </div>
        </div>
        <header>
          <h1>Details</h1>
          {toggle ? (
            <div className={styles.openTrash}>
              <div className={styles.menuOpen}>
                <MoreHorizIcon
                  sx={{ color: grey[100], fontSize: 26 }}
                  onClick={() => setToggle(false)}
                />
              </div>
              <div className={styles.trash}>
                <button type="button">Move to trash</button>
              </div>
            </div>
          ) : (
            <div className={styles.menuClose}>
              <MoreHorizIcon
                sx={{ color: grey[800], fontSize: 26 }}
                onClick={() => setToggle(true)}
              />
            </div>
          )}
        </header>
        <div className={styles.editArea}>
          <div className={styles.editContainer}>
            <div className={styles.icon}>
              <img src={icon} alt="project icon" />
              <button type="button">Change icon</button>
            </div>
            <form>
              <div className={styles.nameInputArea}>
                <label htmlFor="Name">
                  <span>Name</span>
                  <input type="text" id="Name" name="Name" />
                </label>
              </div>
              <div className={styles.keyInputArea}>
                <label htmlFor="key">
                  <span>Key</span>
                  <input type="text" id="key" name="Key" />
                </label>
              </div>
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
