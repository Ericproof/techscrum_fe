import React from 'react';
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiFillYoutube,
  AiFillInstagram
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styles from './PolicyMediaTabs.module.scss';
import IOS from './download-app-iOS.svg';
import Android from './download-app-google.svg';

export default function PolicyMediaTabs() {
  return (
    <div className={styles.policiesMediaDownloadPlatform}>
      <div className={styles.leftItem}>
        <Link to="/terms">Terms & Privacy</Link>
      </div>
      <div className={styles.middleItem}>
        <a href="/techscrumapp">
          <AiFillFacebook />
        </a>
        <a href="/techscrumapp">
          <AiFillLinkedin />
        </a>
        <a href="/techscrumapp">
          <AiFillTwitterSquare />
        </a>
        <a href="/techscrumapp">
          <AiFillYoutube />
        </a>
        <a href="/techscrumapp">
          <AiFillInstagram />
        </a>
      </div>
      <div className={styles.rightItem}>
        <a href="/techscrumapp">
          <img src={IOS} alt="Download iOS App" draggable="false" loading="lazy" />
        </a>
        <a href="/techscrumapp">
          <img src={Android} alt="Download Android App" draggable="false" loading="lazy" />
        </a>
      </div>
    </div>
  );
}
