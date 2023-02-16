import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import styles from './BottomButton.module.scss';

interface Props {
  btnTitle: string;
  trailingIcon?: JSX.Element;
  isShowIcon?: boolean;
}

function BottomButton({ btnTitle, trailingIcon, isShowIcon }: Props) {
  return (
    <button className={styles.buttonBottom}>
      {btnTitle}
      {isShowIcon && trailingIcon}
    </button>
  );
}

BottomButton.defaultProps = {
  isShowIcon: true,
  trailingIcon: <HiArrowNarrowRight color="#7b68ee" size={20} />
};

export default BottomButton;
