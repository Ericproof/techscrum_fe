import React from 'react';
import { TiTick } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';
import styles from './alert.module.scss';

interface Props {
  statusCode: number;
  tipContent: string;
  confirmAlert: () => void;
}

export default function ErrorAlert({ statusCode, tipContent, confirmAlert }: Props) {
  const confirmEventHandler = () => {
    confirmAlert();
  };

  const iconList = [<TiTick color="green" />, <ImCross color="#8B0000" />];

  return (
    <div className={styles.errorContainer}>
      {iconList[statusCode]}
      <h1>{tipContent}</h1>
      <button type="button" onClick={confirmEventHandler}>
        Confirm
      </button>
    </div>
  );
}
