import React from 'react';
import styles from './Setting.module.scss';

export default function Setting() {
  return (
  <div className={styles.setting}>
    <div className={styles.setting__nav}>
    <ol>
      <li></li>
      <li></li>
      <li></li>
    </ol>
    </div>
    <div className={styles.setting__header}>
    <h1>Details</h1>
    <button></button>
    </div>
    <div className={styles.setting__container}>
    <div className={styles.icon}>
      <img></img>
      <button></button>
    </div>
    <div className={styles.content}>
    
    </div>
    </div>

  </div>;
  )
}
