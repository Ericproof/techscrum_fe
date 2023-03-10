import React from 'react';
import { BiCheckbox } from 'react-icons/bi';
import styles from './TaskLabelFilter.module.scss';

export default function TaskTypeFilterDropdown(props: any) {
  const { label } = props;
  const handleBtnClick = () => {};

  return (
    <button className={styles.optionBtn} onClick={handleBtnClick}>
      <BiCheckbox className={styles.optionCheckBox} />
      <div className={styles.optionName}>{label.name}</div>
    </button>
  );
}
