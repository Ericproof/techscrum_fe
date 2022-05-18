import React from 'react';
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiFillYoutube,
  AiFillInstagram
} from 'react-icons/ai';
import styles from './index.module.scss';
import IOS from './download-app-iOS.svg';
import Android from './download-app-google.svg';

export default function policyMediaTabs() {
  return (
    <div className={styles.policiesMediaDownloadPlatform}>
      <div className={styles.leftItem}>
        <a href="/#">Terms & Privacy</a>
      </div>
      <div className={styles.middleItem}>
        <a href="/#">
          <AiFillFacebook />
        </a>
        <a href="/#">
          <AiFillLinkedin />
        </a>
        <a href="/#">
          <AiFillTwitterSquare />
        </a>
        <a href="/#">
          <AiFillYoutube />
        </a>
        <a href="/#">
          <AiFillInstagram />
        </a>
      </div>
      <div className={styles.rightItem}>
        <a href="/#">
          <img src={IOS} alt="Download iOS App" draggable="false" loading="lazy" />
        </a>
        <a href="/#">
          <img src={Android} alt="Download Android App" draggable="false" loading="lazy" />
        </a>
      </div>
    </div>
  );
}
