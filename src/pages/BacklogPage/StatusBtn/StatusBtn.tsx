import React, { useRef, useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import styles from './StatusBtn.module.scss';
import Button from '../../../components/Button/Button';

interface IToolBar {
  status: string;
  onClickChangeStatus: (id: string, status: string) => void;
  taskId: string;
  statusData: any;
}
export default function StatusBtn({ status, onClickChangeStatus, taskId, statusData }: IToolBar) {
  const allBtns = statusData;
  const dropDownBtnRef = useRef<HTMLDivElement | null>(null);

  const [showDropDown, setShowDropDown] = useState(false);

  const dropDownClick = () => {
    setShowDropDown(!showDropDown);
  };
  const btnClick = (statusId: string) => {
    setShowDropDown(false);
    onClickChangeStatus(taskId, statusId);
  };
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (showDropDown && !dropDownBtnRef.current?.contains(e.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropDown]);
  return (
    <div className={styles.statusBtnContainer} ref={dropDownBtnRef}>
      <Button
        icon={<FaChevronDown />}
        iconPosition="end"
        overrideStyle={[styles.statusBtn, styles.dropDownBtnBlue].join(' ')}
        onClick={dropDownClick}
      >
        {status}
      </Button>
      <div
        className={
          showDropDown
            ? [styles.btnDropDownContainer, styles.showBtnDropDownContainer].join(' ')
            : styles.btnDropDownContainer
        }
      >
        <ul className={styles.btnDropDownListContainer}>
          {allBtns.map((btnInfo) => {
            return (
              <li key={btnInfo.name}>
                <Button
                  overrideStyle={[styles.statusBtn, styles.dropDownBtnBlue].join(' ')}
                  onClick={() => {
                    btnClick(btnInfo.id);
                  }}
                >
                  {btnInfo.name.toUpperCase()}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
