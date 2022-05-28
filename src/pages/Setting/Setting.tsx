import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { RiMoreFill } from 'react-icons/ri';
import styles from './Setting.module.scss';
import defaultIcon from '../../assets/defaultIcon.png';
import icon2 from '../../assets/icon2.png';
import icon3 from '../../assets/icon3.png';
import icon4 from '../../assets/icon4.png';
import icon5 from '../../assets/icon5.png';
import icon6 from '../../assets/icon6.png';
import icon7 from '../../assets/icon7.png';
import icon8 from '../../assets/icon8.png';
import icon9 from '../../assets/icon9.png';
import icon10 from '../../assets/icon10.png';
import icon11 from '../../assets/icon11.png';
import icon12 from '../../assets/icon12.png';
import icon13 from '../../assets/icon13.png';
import icon14 from '../../assets/icon14.png';
import icon15 from '../../assets/icon15.png';
import icon16 from '../../assets/icon16.png';
import uploadImage from '../../assets/uploadImage.png';
import ProjectLead from './ProjectLead/ProjectLead';
import Assignee from './Assignee/Assignee';
import UseOutsideAlerter from './OutsideAlerter';

export default function Setting() {
  const icons = [
    { id: 1, photo: icon2 },
    { id: 2, photo: icon3 },
    { id: 3, photo: icon4 },
    { id: 4, photo: icon5 },
    { id: 5, photo: icon6 },
    { id: 6, photo: icon7 },
    { id: 7, photo: icon8 },
    { id: 8, photo: icon9 },
    { id: 9, photo: icon10 },
    { id: 10, photo: icon11 },
    { id: 11, photo: icon12 },
    { id: 12, photo: icon13 },
    { id: 13, photo: icon14 },
    { id: 14, photo: icon15 },
    { id: 15, photo: icon16 }
  ];
  const firstFiveIcons = icons.slice(0, 5);
  const [toggle, setToggle] = useState(false);
  const [editIcon, setEditIcon] = useState(icons[0]);
  const [iconCollection, setIconCollection] = useState(false);
  const { visible, setVisible, myRef } = UseOutsideAlerter(false);
  const handleClickOutside = () => setVisible(true);
  // const [clickedInside, setClickedInside] = useState(false);
  // const myRef = useRef<HTMLDivElement>(null);

  // const handleClickInside = (e: { target: any }) => {
  //   if (!myRef.current.contains(e.target)) {
  //     setClickedInside(false);
  //   }
  // };

  // const handleClickOutside = () => setClickedInside(true);

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickInside);
  //   return () => document.removeEventListener('mousedown', handleClickInside);
  // });

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
          <div ref={myRef} className={styles.editContainer}>
            {visible ? (
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
                                <FiArrowLeft color="grey" size="24px" />
                              </span>
                            </button>
                            <h4>Default icons</h4>
                          </div>
                          <ul>
                            {icons.map((icon) => (
                              <li>
                                <button
                                  type="button"
                                  className={styles.defaultIconOptions}
                                  onClick={() => {
                                    setEditIcon({ id: icon.id, photo: icon.photo });
                                  }}
                                >
                                  <img src={icon.photo} alt="icon" />
                                </button>
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
                                  <li>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditIcon({
                                          id: firstFiveIcon.id,
                                          photo: firstFiveIcon.photo
                                        });
                                      }}
                                    >
                                      <img src={firstFiveIcon.photo} alt="icon" />
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <button type="button" onClick={() => setIconCollection(true)}>
                              <span>
                                <RiMoreFill color="#42526E" size="22px" />
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
                        onClick={() => {
                          setVisible(false);
                        }}
                      >
                        Select
                      </button>
                      <button
                        className={styles.cancelBtn}
                        type="button"
                        onClick={() => {
                          setVisible(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.icon}>
                <img src={defaultIcon} alt="project icon" />
                <button type="button" onClick={handleClickOutside}>
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
