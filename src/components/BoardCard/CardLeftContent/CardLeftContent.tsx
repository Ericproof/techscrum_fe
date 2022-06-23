import React from 'react';
import style from './CardLeftContent.module.scss';
import Description from './components/Description/Description';
import LeftBottom from './components/LeftBottom/LeftBottom';
import AttachIcon from './svg/AttachIcon.svg';

export default function CardLeftContent() {
  return (
    <div className={style.container}>
      <div className={style.cardTitle}>
        <h1>Card UI and function</h1>
      </div>
      <div className={style.attachButton}>
        <label htmlFor="uploadPhoto">
          <img src={AttachIcon} alt="AttachIcon" />
          <span>Attach</span>
          <input id="uploadPhoto" type="file" name="Upload a photo" />
        </label>
      </div>
      <Description />
      <LeftBottom />
    </div>
  );
}
