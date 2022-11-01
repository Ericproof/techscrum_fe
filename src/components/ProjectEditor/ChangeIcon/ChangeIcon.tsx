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
    <div className={(styles.icon, styles.changeIconContainer)}>
      <img className={styles.profileImg} src={value || defaultIcon} alt="project icon" />
      <button
        type="button"
        data-testid="iconButton"
        className={styles.uploadImgBtn}
        onClick={() => {
          toggleModal(!modalShown);
        }}
      >
        Change
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
