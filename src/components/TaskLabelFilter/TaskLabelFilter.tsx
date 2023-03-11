/* eslint-disable no-console */
import React, { useContext, useState, useRef, useEffect } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import styles from './TaskLabelFilter.module.scss';
import LabelOption from './LabelOption';
import { LabelContext } from '../../context/LabelProvider';
import { ILabelData } from '../../types';

interface Props {
  selectedLabels: ILabelData[];
  setSelectedLabels: React.Dispatch<React.SetStateAction<ILabelData[]>>;
}
export default function TaskLabelFilter({ selectedLabels, setSelectedLabels }: Props) {
  const labelsCollection = useContext(LabelContext);
  const [isTabActive, setIsTabActive] = useState(false);
  const myRef = useRef<HTMLDivElement>(null);

  const showOptions = () => {
    setIsTabActive((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    const target = e.target as HTMLDivElement;
    if (myRef.current !== null && !myRef.current.contains(target)) {
      setIsTabActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });

  return (
    <div className={styles.filterTab} ref={myRef}>
      <button
        className={isTabActive ? `${styles.filterBtn} ${styles.active}` : styles.filterBtn}
        onClick={showOptions}
      >
        Label:
        {selectedLabels.length > 0 && <span className={styles.badge}>{selectedLabels.length}</span>}
        <BiChevronDown className={styles.filterBtnIcon} />
      </button>

      <div className={isTabActive ? `${styles.optionsBox} ${styles.active}` : styles.optionsBox}>
        {labelsCollection.map((label) => (
          <LabelOption
            key={label.id}
            label={label}
            selectedLabels={selectedLabels}
            setSelectedLabels={setSelectedLabels}
          />
        ))}
      </div>
    </div>
  );
}
