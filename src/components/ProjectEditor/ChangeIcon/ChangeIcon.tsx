import React, { useState } from 'react';
import styles from './ChangeIcon.module.scss';
import Modal from './Modal/Modal';

interface IChangeIconProps {
  uploadSuccess: (data: any) => void;
  value: string;
  loading?: boolean;
}

export default function ChangeIcon(props: IChangeIconProps) {
  const { uploadSuccess, value, loading = false } = props;
  const [modalShown, toggleModal] = useState(false);

  if (loading) {
    return (
      <div className={(styles.icon, styles.changeIconContainer)}>
        <div className={styles.skeletonImg} />
      </div>
    );
  }

  return (
    <div className={(styles.icon, styles.changeIconContainer)}>
      <img className={styles.profileImg} src={value} alt="project icon" />
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

ChangeIcon.defaultProps = {
  loading: false
};
