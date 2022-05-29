import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { RiMoreFill } from 'react-icons/ri';
import styles from './Modal.module.scss';
import icon2 from '../../../assets/icon2.png';
import icon3 from '../../../assets/icon3.png';
import icon4 from '../../../assets/icon4.png';
import icon5 from '../../../assets/icon5.png';
import icon6 from '../../../assets/icon6.png';
import icon7 from '../../../assets/icon7.png';
import icon8 from '../../../assets/icon8.png';
import icon9 from '../../../assets/icon9.png';
import icon10 from '../../../assets/icon10.png';
import icon11 from '../../../assets/icon11.png';
import icon12 from '../../../assets/icon12.png';
import icon13 from '../../../assets/icon13.png';
import icon14 from '../../../assets/icon14.png';
import icon15 from '../../../assets/icon15.png';
import icon16 from '../../../assets/icon16.png';
import defaultIcon from '../../../assets/defaultIcon.png';
import uploadImage from '../../../assets/uploadImage.png';

function Modal({ shown, close }: { shown: boolean; close: () => void }) {
  const icons = [
    { id: 1, photo: defaultIcon },
    { id: 2, photo: icon2 },
    { id: 3, photo: icon3 },
    { id: 4, photo: icon4 },
    { id: 5, photo: icon5 },
    { id: 6, photo: icon6 },
    { id: 7, photo: icon7 },
    { id: 8, photo: icon8 },
    { id: 9, photo: icon9 },
    { id: 10, photo: icon10 },
    { id: 11, photo: icon11 },
    { id: 12, photo: icon12 },
    { id: 13, photo: icon13 },
    { id: 14, photo: icon14 },
    { id: 15, photo: icon15 },
    { id: 16, photo: icon16 }
  ];
  const firstFiveIcons = icons.slice(0, 5);
  const fiveIcons = firstFiveIcons.map((firstFiveIcon) => (
    <li key={firstFiveIcon.id}>
      <img src={firstFiveIcon.photo} alt="icon" />
    </li>
  ));
  const listIcons = icons.map((icon) => (
    <li key={icon.id}>
      <img src={icon.photo} alt="icon" />
    </li>
  ));
  const [iconCollection, setIconCollection] = useState(false);
  return shown ? (
    <div className={styles.modalBackdrop} onClick={close} aria-hidden="true">
      <div
        className={styles.modalContent}
        onClick={(e) => {
          e.stopPropagation();
        }}
        aria-hidden="true"
      >
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
                    <ul>{listIcons}</ul>
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
                          {/* {firstFiveIcons.map((firstFiveIcon) => (
                            <li>
                              <button
                                type="button"
                                key={(firstFiveIcon.id, firstFiveIcon.photo)}
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
                          ))} */}
                          {fiveIcons}
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
                <button className={styles.selectBtn} type="button" onClick={close}>
                  Select
                </button>
                <button className={styles.cancelBtn} type="button" onClick={close}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default Modal;
