/* eslint-disable react/require-default-props */
import React from 'react';
import styles from './Button.module.scss';

export interface IButton {
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  overrideStyle?: string;
  onClick?: () => void;
  children: string;
}

export default function Button({
  icon,
  iconPosition = 'start',
  overrideStyle,
  onClick,
  children
}: IButton) {
  return (
    <button
      className={`${styles.buttonContainer} ${
        iconPosition === 'start' ? '' : styles.rowReversed
      } ${overrideStyle}`}
      onClick={onClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.buttonText}>{children}</span>
    </button>
  );
}
