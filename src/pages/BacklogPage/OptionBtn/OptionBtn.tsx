import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import styles from './OptionBtn.module.scss';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';

interface IOptionBtn {
  taskId: string;
  showOptionBtn: boolean;
  sprintId: string;
  onClickDelete: (id: string) => void;
  toggleDisableShowOptionBtnEffect: () => void;
}
export default function OptionBtn({
  taskId,
  showOptionBtn,
  sprintId,
  onClickDelete,
  toggleDisableShowOptionBtnEffect
}: IOptionBtn) {
  const [clickOptionBtnShowStyle, setClickOptionBtnShowStyle] = useState(false);
  const [hoverOptionBtn, setHoverOptionBtn] = useState(false);

  const action = () => {
    toggleDisableShowOptionBtnEffect();
    setClickOptionBtnShowStyle(false);
  };
  const { visible, setVisible, myRef } = useOutsideAlerter(false, action);

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
    <div className={styles.optionBtnContainer} ref={myRef}>
      <button
        className={btnClassName}
        onClick={() => {
          setVisible(!visible);
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
          visible
            ? [styles.optionBtnDropDown, styles.showOptionBtnDropDown].join(' ')
            : styles.optionBtnDropDown
        }
      >
        <ul>
          <p>Actions</p>
          <li>
            <button className={styles.dropDownBtn}>Copy issue link</button>
          </li>
          {sprintId && (
            <li>
              <button className={styles.dropDownBtn}>Add to Backlog</button>
            </li>
          )}
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
