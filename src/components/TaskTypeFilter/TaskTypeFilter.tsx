import React, { useEffect, useRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import styles from './TaskTypeFilter.module.scss';
import TaskTypeFilterDropdown from './TaskTypeFilterDropdown/TaskTypeFilterDropdown';

interface ITaskTypeFilter {
  typeList: any;
  selectedTypes: any;
  changeSelectedTypes: any;
  setSelectedTypes: any;
}

export default function TaskTypeFilter(props: ITaskTypeFilter) {
  const { typeList, selectedTypes, changeSelectedTypes, setSelectedTypes } = props;
  const myRef = useRef<HTMLDivElement>(null);

  const [typeFilterPressed, setTypeFilterPressed] = useState(false);
  const handleBtnOnClick = () => {
    setTypeFilterPressed((prevState) => !prevState);
  };

  const handleClickOutside = (e) => {
    const target = e.target as HTMLDivElement;
    if (myRef.current !== null && !myRef.current.contains(target)) {
      setTypeFilterPressed(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });

  const buttonClassName = typeFilterPressed
    ? `${styles.taskTypeFilterBtn} ${styles.taskTypeFilterBtnPressed}`
    : `${styles.taskTypeFilterBtn} ${styles.taskTypeFilterBtnUnpressed}`;

  return (
    <div className={styles.taskTypeFilterContainer} ref={myRef}>
      <div className={styles.taskTypeFilterBtnContainer}>
        <button className={buttonClassName} onClick={handleBtnOnClick}>
          Type
          <BiChevronDown className={styles.biChevronDownIcon} />
        </button>
      </div>
      {typeFilterPressed && (
        <div className={styles.taskTypeFilterDropdownContainer}>
          {typeList.map((type) => (
            <TaskTypeFilterDropdown
              key={type.id}
              type={type}
              selectedTypes={selectedTypes}
              changeSelectedTypes={changeSelectedTypes}
              setSelectedTypes={setSelectedTypes}
            />
          ))}
        </div>
      )}
    </div>
  );
}
