import React, { useEffect, useState } from 'react';
import styles from './TrailHeading.module.scss';

function TrialHeading() {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked((ischecked) => !ischecked);
  };

  return (
    <div className={styles.text}>
      <div>
        <h1>
          <span className={styles.start}>Start</span> Your 14-Day Trial Today!
        </h1>
        <h5>
          Save your business time, money, and hassle with the top-rated inventory management
          software.
        </h5>
      </div>
      <div className={styles.option}>
        <p className={styles.month}>Monthly</p>
        <label htmlFor="switch">
          <input
            id="switch"
            className={styles.input}
            type="checkbox"
            onChange={handleClick}
            checked={isChecked}
          />
          <div className={styles.switch} onChange={handleClick}>
            <div
              className={styles.trigger}
              style={{
                transform: `translateX(${isChecked ? 2 : 40}px)`,
                transition: 'transform 0.2s'
              }}
            />
          </div>
        </label>

        <div className={styles.year}>
          <span>Yearly</span>
          <span className={styles.info}>(Save up to 60%)</span>
        </div>
      </div>
    </div>
  );
}

export default TrialHeading;
