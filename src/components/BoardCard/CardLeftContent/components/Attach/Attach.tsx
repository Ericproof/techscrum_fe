import React from 'react';
import { ImAttachment } from 'react-icons/im';
import styles from './Attach.module.scss';

export default function Attach() {
  return (
    <div className={styles.attachButton}>
      <label htmlFor="uploadPhoto">
        <ImAttachment className={styles.attachIcon} />
        <span>Attach</span>
        <input id="uploadPhoto" type="file" name="Upload a photo" />
      </label>
    </div>
  );
}
