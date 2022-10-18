import React, { useState } from 'react';
import DailyScrum from '../../DailyScrum/DailyScrum';
import styles from './DailyScrumBtn.module.scss';

export default function DailyScrumBtn() {
  const [showDailyScrum, setShowDailyScrum] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setShowDailyScrum(true);
        }}
        className={styles.dailyScrumBtn}
      >
        Daily scrum
      </button>
      {showDailyScrum && (
        <DailyScrum
          onClickCloseModal={() => {
            setShowDailyScrum(false);
          }}
        />
      )}
    </>
  );
}
