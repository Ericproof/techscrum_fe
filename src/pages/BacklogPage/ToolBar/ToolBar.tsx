import React, { useRef, useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import styles from './ToolBar.module.scss';
import Button from '../../../components/Button/Button';
import Avartar from '../../../assets/userAvatar.png';
import IconButton from '../../../components/Button/IconButton/IconButton';
// WIP more function will be added

export default function DropDownBtnList() {
  const dropDownBtnRef = useRef<HTMLDivElement | null>(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('TO DO');
  const dropDownClick = () => {
    setShowDropDown(!showDropDown);
  };
  const btnClick = (status) => {
    // eslint-disable-next-line no-console
    setCurrentStatus(status);
    setShowDropDown(false);
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
        overrideStyle={styles.statusBtn}
        onClick={dropDownClick}
      >
        {currentStatus}
      </Button>
      <div
        className={
          showDropDown
            ? [styles.btnDropDownContainer, styles.showBtnDropDownContainer].join(' ')
            : styles.btnDropDownContainer
        }
      >
        <ul className={styles.btnDropDownListContainer}>
          <li>
            <Button
              overrideStyle={[styles.statusBtn, styles.dropDownBtnGray].join(' ')}
              onClick={btnClick}
            >
              TO DO
            </Button>
          </li>
          <li>
            <Button
              overrideStyle={[styles.statusBtn, styles.dropDownBtnBlue].join(' ')}
              onClick={btnClick}
            >
              IN PROGRESS
            </Button>
          </li>
          <li>
            <Button
              overrideStyle={[styles.statusBtn, styles.dropDownBtnBlue].join(' ')}
              onClick={btnClick}
            >
              PR REVIEW
            </Button>
          </li>
          <li>
            <Button
              overrideStyle={[styles.statusBtn, styles.dropDownBtnBlue].join(' ')}
              onClick={btnClick}
            >
              MERGED
            </Button>
          </li>
          <li>
            <Button
              overrideStyle={[styles.statusBtn, styles.dropDownBtnGreen].join(' ')}
              onClick={btnClick}
            >
              DONE
            </Button>
          </li>
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
