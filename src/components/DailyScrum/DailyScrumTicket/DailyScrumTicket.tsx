import React, { useState } from 'react';
import styles from './DailyScrumTicket.module.scss';

interface IDailyScrumTicket {
  id: string;
  title: string;
}
export default function DailyScrumTicket({ id, title }: IDailyScrumTicket) {
  const [progressValue, setProgressValue] = useState('0');
  const [finishRadioClicked, setFinishRadioClicked] = useState(false);
  const [finish, setFinish] = useState(false);
  const [support, setSupport] = useState(false);
  const onChangeProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgressValue(e.target.value);
  };

  return (
    <div className={styles.dailyScrumTicket}>
      <p className={styles.ticketTitle}>
        {id} - {title}
      </p>
      <div className={styles.progress}>
        <p>Progress</p>
        <div className={styles.progressRange}>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            defaultValue="0"
            onChange={onChangeProgress}
          />
          <p>{progressValue}%</p>
        </div>
      </div>
      <div className={styles.finish}>
        <p>Can you finish this ticket by sprint end?</p>
        <label htmlFor="finish" className={styles.radioLabel}>
          <input
            type="radio"
            name="finish"
            id="finish"
            onChange={() => {
              setFinishRadioClicked(true);
              setFinish(true);
            }}
          />
          Yes
        </label>
        <label htmlFor="notFinish" className={styles.radioLabel}>
          <input
            type="radio"
            name="finish"
            id="notFinish"
            onChange={() => {
              setFinishRadioClicked(true);
              setFinish(false);
            }}
          />
          No
        </label>
        {!finish && finishRadioClicked && (
          <div className={styles.anyReason}>
            <p>Any reasons?</p>
            <textarea name="reason" id="" cols={30} rows={10} />
          </div>
        )}
      </div>
      <div className={styles.support}>
        <p>Do you need support to complete this ticket?</p>
        <label htmlFor="support" className={styles.radioLabel}>
          <input
            type="radio"
            name="support"
            id="support"
            onChange={() => {
              setSupport(true);
            }}
          />
          Yes
        </label>
        <label htmlFor="notSupport" className={styles.radioLabel}>
          <input
            type="radio"
            name="support"
            id="notSupport"
            onChange={() => {
              setSupport(false);
            }}
          />
          No
        </label>
      </div>
    </div>
  );
}
