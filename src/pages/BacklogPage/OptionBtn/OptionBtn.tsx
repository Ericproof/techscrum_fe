import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import styles from './OptionBtn.module.scss';

interface IOptionBtn {
  showOptionBtn: boolean;
}
export default function OptionBtn({ showOptionBtn }: IOptionBtn) {
  return (
    <button
      className={
        showOptionBtn
          ? [styles.optionBtnContainer, styles.showOptionBtnContainer].join(' ')
          : styles.optionBtnContainer
      }
    >
      <BsThreeDots />
    </button>
  );
}
