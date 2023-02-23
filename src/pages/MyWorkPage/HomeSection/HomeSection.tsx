import React from 'react';
import styles from './HomeSection.module.scss';
import VideoFrame from '../VideoFrame/VideoFrame';
import InputEmail from '../InputEmail/InputEmail';
import ButtonGetStart from '../ButtonGetStart/ButtonGetStart';

export default function HomeSection() {
  return (
    <div className={styles.homeSection}>
      <div className={styles.wrapper}>
        <div className={styles.homeLeft}>
          <h1 className={styles.heading}>Create the perfect Agile workflow with Board view.</h1>
          <p className={styles.subTitle}>
            Build a flexible Kanban system to visualize your work and improve project management.
          </p>
          <InputEmail />
          <ButtonGetStart />
        </div>
        <div className={styles.homeRight}>
          <VideoFrame />
        </div>
      </div>
    </div>
  );
}
