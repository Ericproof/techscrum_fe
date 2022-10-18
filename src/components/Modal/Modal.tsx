import React from 'react';
import styles from './Modal.module.scss';

interface IModal {
  children: React.ReactNode;
}
export default function Modal({ children }: IModal) {
  return <div className={styles.backdrop}>{children}</div>;
}
