import React, { useRef, useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import styles from './ToolBar.module.scss';
import Button from '../../../components/Button/Button';
import Avartar from '../../../assets/userAvatar.png';
import IconButton from '../../../components/Button/IconButton/IconButton';
// WIP fixing dropdown btn menu
interface IToolBar {
  status: string;
  onClickChangeStatus: (id: string, status: string) => void;
  id: string;
}
export default function ToolBar({ status, onClickChangeStatus, id }: IToolBar) {
  const allBtns = [
    { status: 'TO DO', color: 'dropDownBtnGray' },
    { status: 'BLOCKED', color: 'dropDownBtnBlue' },
    { status: 'IN PROGRESS', color: 'dropDownBtnBlue' },
    { status: 'PR REVIEW', color: 'dropDownBtnBlue' },
    { status: 'TESTING', color: 'dropDownBtnBlue' },
    { status: 'DONE', color: 'dropDownBtnGreen' }
  ];
  const dropDownBtnRef = useRef<HTMLDivElement | null>(null);

  const [showDropDown, setShowDropDown] = useState(false);

  const dropDownClick = () => {
    setShowDropDown(!showDropDown);
  };
  const btnClick = (title: string) => {
    setShowDropDown(false);
    onClickChangeStatus(id, title);
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
    <div className={styles.toolbar} ref={dropDownBtnRef}>
      <Button
        icon={<FaChevronDown />}
        iconPosition="end"
        overrideStyle={[
          styles.statusBtn,
          styles[allBtns.filter((btn) => btn.status === status)[0].color]
        ].join(' ')}
        onClick={dropDownClick}
      >
        {allBtns.filter((btn) => btn.status === status)[0].status}
      </Button>
      <div
        className={
          showDropDown
            ? [styles.btnDropDownContainer, styles.showBtnDropDownContainer].join(' ')
            : styles.btnDropDownContainer
        }
      >
        <ul className={styles.btnDropDownListContainer}>
          {allBtns
            .filter((btn) => btn.status !== status)
            .map((btnInfo) => {
              return (
                <li key={btnInfo.status}>
                  <Button
                    overrideStyle={[styles.statusBtn, styles[btnInfo.color]].join(' ')}
                    onClick={() => {
                      btnClick(btnInfo.status);
                    }}
                  >
                    {btnInfo.status}
                  </Button>
                </li>
              );
            })}
        </ul>
      </div>
      <IconButton
        overrideStyle={styles.assignee}
        icon={<img src={Avartar} alt="avatar" />}
        tooltip="unassigned"
      />
    </div>
  );
}
