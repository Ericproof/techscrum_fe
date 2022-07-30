import React from 'react';
import styles from './ReporterFields.module.scss';

interface ITaskRelator {
  reporterInfo: any;
}

export default function ReporterFields({ reporterInfo }: ITaskRelator) {
  return (
    <div className={styles.reporter}>
      <div>Reporter</div>
      <div className={styles.leadDropdownContainer}>
        <button className={styles.leadInputClose} type="button">
          <img
            src={
              reporterInfo.avatarIcon ??
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
            }
            alt="avatar"
          />
          <span>{reporterInfo.name ?? ''}</span>
        </button>
      </div>
    </div>
  );
}
