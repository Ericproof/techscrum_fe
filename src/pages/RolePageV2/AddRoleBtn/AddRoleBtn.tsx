import React, { useState } from 'react';
import { GrAdd, GrFormCheckmark, GrFormClose } from 'react-icons/gr';
import styles from './AddRoleBtn.module.scss';

function AddRoleBtn() {
  const [isShown, setIsShown] = useState(false);
  const [popupWindow, setPopupWindow] = useState(false);

  const buttonNotice = isShown && (
    <div className={styles['notice-container']}>
      <p>Create New Role</p>
    </div>
  );

  const addRoleHandler = () => {
    setPopupWindow(false);
  };

  const popupLayout = popupWindow && (
    <div className={styles['popup-window']}>
      <input name="roleName" />
      <button onClick={addRoleHandler}>
        <GrFormCheckmark />
      </button>
      <button onClick={() => setPopupWindow(false)}>
        <GrFormClose />
      </button>
    </div>
  );

  return (
    <div>
      <div className={styles['addBtn-container']}>
        {popupWindow || (
          <>
            <button
              className={styles.addBtn}
              onClick={() => setPopupWindow(true)}
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
            >
              <GrAdd />
            </button>
            {buttonNotice}
          </>
        )}
      </div>
      {popupLayout}
    </div>
  );
}

export default AddRoleBtn;
