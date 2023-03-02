import React, { useState } from 'react';
import { BiCheckbox, BiCheckboxChecked } from 'react-icons/bi';
import styles from '../TaskTypeFilter.module.scss';

interface ITaskTypeFilterDropdown {
  type: any;
  selectedTypes: any;
  changeSelectedTypes: any;
  setSelectedTypes: any;
}

export default function TaskTypeFilterDropdown(props: ITaskTypeFilterDropdown) {
  const { type, selectedTypes, changeSelectedTypes, setSelectedTypes } = props;
  const checkExisting = () => {
    let isExists = false;
    selectedTypes.forEach((selectedType) => {
      if (selectedType.id === type.id) {
        isExists = true;
      }
    });
    return isExists;
  };
  const [selected, setSelected] = useState(checkExisting());

  const handleBtnClick = () => {
    setSelected((prevState) => !prevState);
    const isExists = checkExisting();
    setSelectedTypes(changeSelectedTypes(isExists, selectedTypes, type));
  };

  return (
    <button className={styles.taskTypeFilterDropdownBtn} onClick={handleBtnClick}>
      {selected ? (
        <BiCheckboxChecked className={styles.taskTypeFilterDropdownCheck} />
      ) : (
        <BiCheckbox className={styles.taskTypeFilterDropdownCheck} />
      )}
      <img className={styles.taskTypeFilterDropdownIcon} src={type.icon} alt={type.name} />
      <div className={styles.taskTypeFilterDropdownName}>{type.name}</div>
    </button>
  );
}
