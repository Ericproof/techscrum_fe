import React from 'react';
import { ImEarth } from 'react-icons/im';
// import icon from './pic.jpg';

import styles from './UserPage.module.scss';

export default function UserPage() {
  return (
    <div className={styles.userPage}>
      <div className={styles.userBar}>
        <h2>About</h2>
        <hr className={styles.line} />
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
  );
}
