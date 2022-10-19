import React from 'react';
import styles from './Modal.module.scss';

interface IModal {
  children?: React.ReactNode;
  classesName?: string;
}
export default function Modal({ children, classesName }: IModal) {
  return (
    <div className={styles.backdrop}>
      <div className={[styles.modal, classesName].join(' ')}>{children}</div>
    </div>
  );
}
Modal.defaultProps = {
  children: null,
  classesName: ''
};
