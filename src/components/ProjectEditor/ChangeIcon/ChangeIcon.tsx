import React, { useState } from 'react';
import styles from './ChangeIcon.module.scss';
import defaultIcon from '../../../assets/defaultIcon.png';
import Modal from './Modal/Modal';

interface IChangeIconProps {
  uploadSuccess: (data: any) => void;
  value: string;
}

export default function ChangeIcon(props: IChangeIconProps) {
  const { uploadSuccess, value } = props;
  const [modalShown, toggleModal] = useState(false);
  return (
    <div className={styles.icon}>
      <img src={value || defaultIcon} alt="project icon" />
      <button
        type="button"
        data-testid="iconButton"
        onClick={() => {
          toggleModal(!modalShown);
        }}
      >
        Change icon
      </button>
      <Modal
        shown={modalShown}
        close={() => {
          toggleModal(false);
        }}
        uploadSuccess={(data) => {
          toggleModal(!modalShown);
          uploadSuccess(data);
        }}
      />
    </div>
  );
}
