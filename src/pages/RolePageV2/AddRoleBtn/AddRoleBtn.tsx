import React, { useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import styles from './AddRoleBtn.module.scss';

function AddRoleBtn() {
  const [isShown, setIsShown] = useState(false);

  const buttonNotice = isShown && (
    <div className={styles['notice-container']}>
      <p>Create New Role</p>
    </div>
  );

  return (
    <div className={styles['addBtn-container']}>
      <button
        className={styles.addBtn}
        onClick={() => console.log('click')}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <GrAdd />
      </button>
      {buttonNotice}
    </div>
  );
}

export default AddRoleBtn;
