import React, { useState, useRef, useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import styles from './OptionBtn.module.scss';

interface IOptionBtn {
  showOptionBtn: boolean;
  taskId: string;
  onClickDelete: (id: string) => void;
  toggleDisableShowOptionBtnEffect: () => void;
}
export default function OptionBtn({
  showOptionBtn,
  taskId,
  onClickDelete,
  toggleDisableShowOptionBtnEffect
}: IOptionBtn) {
  const [showOptionDropDownBtns, setShowOptionDropDownBtns] = useState(false);
  const [clickOptionBtnShowStyle, setClickOptionBtnShowStyle] = useState(false);
  const [hoverOptionBtn, setHoverOptionBtn] = useState(false);
  const optionBtnRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (showOptionDropDownBtns && !optionBtnRef?.current?.contains(e.target)) {
        setShowOptionDropDownBtns(false);
        toggleDisableShowOptionBtnEffect();
        setClickOptionBtnShowStyle(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptionDropDownBtns, toggleDisableShowOptionBtnEffect]);

  let btnClassName = '';
  if (showOptionBtn && clickOptionBtnShowStyle) {
    btnClassName = [styles.optionBtn, styles.showOptionBtn, styles.clickOptionBtn].join(' ');
  } else if (showOptionBtn && hoverOptionBtn) {
    btnClassName = [styles.optionBtn, styles.showOptionBtn, styles.optionBtnHover].join(' ');
  } else if (showOptionBtn) {
    btnClassName = [styles.optionBtn, styles.showOptionBtn].join(' ');
  } else {
    btnClassName = styles.optionBtn;
  }
  return (
    <div className={styles.optionBtnContainer} ref={optionBtnRef}>
      <button
        className={btnClassName}
        onClick={() => {
          setShowOptionDropDownBtns(!showOptionDropDownBtns);
          setClickOptionBtnShowStyle(!clickOptionBtnShowStyle);
          toggleDisableShowOptionBtnEffect();
        }}
        onMouseOver={() => {
          setHoverOptionBtn(true);
        }}
        onMouseOut={() => {
          setHoverOptionBtn(false);
        }}
        onBlur={() => {}}
        onFocus={() => {}}
        data-testid={'hover-show-option-btn-'.concat(taskId)}
      >
        <BsThreeDots />
      </button>
      <div
        className={
          showOptionDropDownBtns
            ? [styles.optionBtnDropDown, styles.showOptionBtnDropDown].join(' ')
            : styles.optionBtnDropDown
        }
      >
        <ul>
          <p>Actions</p>
          <li>
            <button className={styles.dropDownBtn}>Copy issue link</button>
          </li>
          <li>
            <button
              className={styles.dropDownBtn}
              onClick={() => {
                onClickDelete(taskId);
              }}
              data-testid={'delete-task-'.concat(taskId)}
            >
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
