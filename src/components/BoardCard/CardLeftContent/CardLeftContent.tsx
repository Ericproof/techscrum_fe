import React from 'react';
import { ImAttachment } from 'react-icons/im';
import style from './CardLeftContent.module.scss';
import Description from './components/Description/Description';
import LeftBottom from './components/LeftBottom/LeftBottom';

export default function CardLeftContent() {
  return (
    <div className={style.container}>
      <div className={style.cardTitle}>
        <h1>Card UI and function</h1>
      </div>
      <div className={style.attachButton}>
        <label htmlFor="uploadPhoto">
          <ImAttachment className={style.attachIcon} />
          <span>Attach</span>
          <input id="uploadPhoto" type="file" name="Upload a photo" />
        </label>
      </div>
      <Description />
      <LeftBottom />
    </div>
  );
}
