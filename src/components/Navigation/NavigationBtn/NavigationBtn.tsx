/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import styles from './NavigationBtn.module.scss';

export interface INavigationBtn {
  dataTestId: string;
  onClick: (e: any) => void;
  children: React.ReactNode | string;
  classesName?: string | string[];
}

export default function NavigationBtn(props: INavigationBtn) {
  const { dataTestId, onClick, children, classesName } = props;
  return (
    <button
      data-testid={dataTestId}
      className={[styles.navBtn, classesName].join(' ')}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

NavigationBtn.defaultProps = {
  classesName: null
};
