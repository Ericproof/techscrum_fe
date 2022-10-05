import React from 'react';
import styles from './IconButton.module.scss';

interface IIconButton {
  icon: React.ReactNode;
  tooltip: string;
  overrideStyle?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
export default function IconButton({ icon, tooltip, overrideStyle, onClick }: IIconButton) {
  return (
    <button className={[styles.iconButton, overrideStyle].join(' ')} onClick={onClick}>
      {icon}
      <span className={styles.tooltip}>{tooltip}</span>
    </button>
  );
}

IconButton.defaultProps = {
  overrideStyle: '',
  onClick: () => {}
};
