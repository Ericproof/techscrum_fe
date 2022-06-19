import React, { useState } from 'react';
import styles from './ChangeIcon.module.scss';
import defaultIcon from '../../../assets/defaultIcon.png';
import Modal from './Modal/Modal';

export default function ChangeIcon() {
  const [modalShown, toggleModal] = useState(false);
  return (
    <div className={styles.icon}>
      <img src={defaultIcon} alt="project icon" />
      <button
        type="button"
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
      />
    </div>
  );
}
