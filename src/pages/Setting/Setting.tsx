import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { grey } from '@mui/material/colors';
// import { Icon } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './Setting.module.scss';
// import defaultIcon from '../../assets/defaultIcon.png';
import uploadImage from '../../assets/uploadImage.png';
import ProjectLead from './ProjectLead/ProjectLead';
import Assignee from './Assignee/Assignee';

export default function Setting() {
  const [toggle, setToggle] = useState(false);
  const [uploadIcon, setUploadIcon] = useState(false);
  const icons = [
    { id: 1, photo: 'https://picsum.photos/50' },
    { id: 2, photo: 'https://picsum.photos/50' },
    { id: 3, photo: 'https://picsum.photos/50' },
    { id: 4, photo: 'https://picsum.photos/50' },
    { id: 5, photo: 'https://picsum.photos/50' },
    { id: 6, photo: 'https://picsum.photos/50' },
    { id: 7, photo: 'https://picsum.photos/50' },
    { id: 8, photo: 'https://picsum.photos/50' },
    { id: 9, photo: 'https://picsum.photos/50' },
    { id: 10, photo: 'https://picsum.photos/50' },
    { id: 11, photo: 'https://picsum.photos/50' },
    { id: 12, photo: 'https://picsum.photos/50' },
    { id: 13, photo: 'https://picsum.photos/50' },
    { id: 14, photo: 'https://picsum.photos/50' },
    { id: 15, photo: 'https://picsum.photos/50' }
  ];
  const firstFiveIcons = icons.slice(0, 5);
  const [editIcon, setEditIcon] = useState(icons[0]);
  const [iconCollection, setIconCollection] = useState(false);
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
        <div className={styles.editSection}>
          <div className={styles.editContainer}>
            {uploadIcon ? (
              <div className={styles.popupPage}>
                <div className={styles.popupSection}>
                  <div className={styles.popupWindow}>
                    <h3>Choose an icon</h3>
                    {iconCollection ? (
                      <div className={styles.defaultIconSection}>
                        <div className={styles.defaultIconContainer}>
                          <div className={styles.defaultIconHeader}>
                            <button
                              type="button"
                              className={styles.backBtn}
                              onClick={() => setIconCollection(false)}
                            >
                              <span>
                                <ArrowBackIcon sx={{ fontSize: 22 }} />
                              </span>
                            </button>
                            <h4>Default icons</h4>
                          </div>
                          <ul>
                            {icons.map((icon) => (
                              <li
                                onClick={() => {
                                  setEditIcon({ id: icon.id, photo: icon.photo });
                                }}
                              >
                                <img src={icon.photo} alt="icon" />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.uploadSection}>
                        <div className={styles.uploadContainer}>
                          <div className={styles.uploadOptions}>
                            <div className={styles.dragArea}>
                              <div className={styles.dragCircle}>
                                <img src={uploadImage} alt="upload icon" />
                                <span>Drag and drop your images here</span>
                              </div>
                              <p>or</p>
                              <label htmlFor="uploadPhoto">
                                Upload a photo
                                <input
                                  id="uploadPhoto"
                                  type="file"
                                  name="Upload a photo"
                                  style={{ display: 'none' }}
                                />
                              </label>
                            </div>
                          </div>
                          <div className={styles.photoCollection}>
                            <div className={styles.iconList}>
                              <ul>
                                {firstFiveIcons.map((firstFiveIcon) => (
                                  <li
                                    onClick={() => {
                                      setEditIcon({
                                        id: firstFiveIcon.id,
                                        photo: firstFiveIcon.photo
                                      });
                                    }}
                                  >
                                    <img src={firstFiveIcon.photo} alt="icon" />
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <button type="button" onClick={() => setIconCollection(true)}>
                              <span>
                                <MoreHorizIcon sx={{ color: grey[800], fontSize: 24 }} />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className={styles.buttonSection}>
                      <button
                        className={styles.selectBtn}
                        type="button"
                        onClick={() => setUploadIcon(false)}
                      >
                        Select
                      </button>
                      <button
                        className={styles.cancelBtn}
                        type="button"
                        onClick={() => setUploadIcon(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.icon}>
                <img src={editIcon.photo} alt="project icon" />
                <button type="button" onClick={() => setUploadIcon(true)}>
                  Change icon
                </button>
              </div>
            )}
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
