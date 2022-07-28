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
          <img src={reporterInfo.avatarIcon} alt="avatar" />
          <span>{reporterInfo.name}</span>
        </button>
      </div>
    </div>
  );
}
