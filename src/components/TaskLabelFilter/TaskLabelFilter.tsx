/* eslint-disable no-console */
import React, { useContext, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import styles from './TaskLabelFilter.module.scss';
import LabelOptions from './LabelOptions';
import { LabelContext } from '../../context/LabelProvider';

export default function TaskTypeFilter() {
  const labels = useContext(LabelContext);
  const [isBtnActive, setIsBtnActive] = useState(false);

  const showOptions = () => {
    setIsBtnActive((prev) => !prev);
  };

  const closeOptions = () => {
    setIsBtnActive(false);
  };

  return (
    <div className={styles.filterTab}>
      <button
        className={isBtnActive ? `${styles.filterBtn} ${styles.active}` : styles.filterBtn}
        onClick={showOptions}
        onBlur={closeOptions}
      >
        Label
        <BiChevronDown className={styles.filterBtnIcon} />
      </button>

      <div className={isBtnActive ? `${styles.optionsBox} ${styles.active}` : styles.optionsBox}>
        {labels.map((label) => (
          <LabelOptions key={label.id} label={label} />
        ))}
      </div>
    </div>
  );
}
