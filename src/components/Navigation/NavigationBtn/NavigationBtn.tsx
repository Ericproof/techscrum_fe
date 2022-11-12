/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import styles from './NavigationBtn.module.scss';

export interface INavigationBtn {
  dataTestId: string;
  onClick: (e: any) => void;
  children: React.ReactNode | string;
}

export default function NavigationBtn(props: INavigationBtn) {
  const { dataTestId, onClick, children } = props;
  return (
    <button data-testid={dataTestId} className={styles.navBtn} onClick={onClick}>
      {children}
    </button>
  );
}
