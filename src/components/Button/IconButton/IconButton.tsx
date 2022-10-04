import React from 'react';
import styles from './IconButton.module.scss';

interface IIconButton {
  icon: React.ReactNode;
  tooltip: string;
  overrideStyle?: string;
}
export default function IconButton({ icon, tooltip, overrideStyle }: IIconButton) {
  return (
    <button className={[styles.iconButton, overrideStyle].join(' ')}>
      {icon}
      <span className={styles.tooltip}>{tooltip}</span>
    </button>
  );
}

IconButton.defaultProps = {
  overrideStyle: ''
};
