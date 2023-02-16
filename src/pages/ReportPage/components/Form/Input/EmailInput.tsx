import React from 'react';
import { HiOutlineMailOpen } from 'react-icons/hi';
import PrimaryButton from '../../Button/PrimaryButton/PrimaryButton';
import styles from './EmailInput.module.scss';

interface Props {
  isShowInputIcon?: boolean;
  iconColor?: string;
  btnBackgroundColor?: 'green' | 'brand' | 'blue' | 'pink' | 'default' | '';
  isFullWidth?: boolean;
  isButtonShrink?: boolean;
}

function EmailInput({
  isShowInputIcon,
  iconColor,
  btnBackgroundColor,
  isFullWidth,
  isButtonShrink
}: Props) {
  return (
    <div className={[styles.emailInput, styles[isFullWidth ? 'fullWidth' : '']].join(' ')}>
      <div className={styles.inputWrapper}>
        {isShowInputIcon && <HiOutlineMailOpen color={iconColor} size={20} />}
        {isShowInputIcon ? (
          <input type="email" placeholder="Enter your work email" className={styles.iconInput} />
        ) : (
          <input type="email" placeholder="Enter your work email" />
        )}
      </div>
      <PrimaryButton
        btnTitle="get started"
        isFullWidth={!isButtonShrink}
        btnBackgroundColor={btnBackgroundColor}
      />
    </div>
  );
}

EmailInput.defaultProps = {
  isShowInputIcon: false,
  iconColor: 'pink',
  btnBackgroundColor: 'brand',
  isFullWidth: false,
  isButtonShrink: false
};

export default EmailInput;
