import React, { useState } from 'react';
import { RiMoreFill } from 'react-icons/ri';
import styles from './Setting.module.scss';
import defaultIcon from '../../assets/defaultIcon.png';
import ProjectLead from './ProjectLead/ProjectLead';
import Assignee from './Assignee/Assignee';
import Modal from './Modal/Modal';

export default function Setting() {
  const [toggle, setToggle] = useState(false);
  const [modalShown, toggleModal] = useState(false);

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
                <RiMoreFill color="#fff" size="24px" onClick={() => setToggle(false)} />
              </div>
              <div className={styles.trash}>
                <button type="button">Move to trash</button>
              </div>
            </div>
          ) : (
            <div className={styles.menuClose}>
              <RiMoreFill color="#42526E" size="24px" onClick={() => setToggle(true)} />
            </div>
          )}
        </header>
        <div className={styles.editSection}>
          <div className={styles.editContainer}>
            <div className={styles.icon}>
              <img src={defaultIcon} alt="project icon" />
              <button
                type="button"
                onClick={() => {
                  toggleModal(!modalShown);
                }}
              >
                Change icon
              </button>
              <Modal
                shown={modalShown}
                close={() => {
                  toggleModal(false);
                }}
              />
            </div>
            <form>
              <div className={styles.nameInputSection}>
                <label htmlFor="Name">
                  <span>Name</span>
                  <input type="text" id="Name" name="Name" />
                </label>
              </div>
              <div className={styles.keyInputSection}>
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
