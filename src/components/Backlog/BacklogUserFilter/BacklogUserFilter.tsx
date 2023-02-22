import React, { useState } from 'react';
import styles from '../../../pages/BacklogPage/BacklogPage.module.scss';

interface IBacklogFilter {
  user: any;
}

export default function BacklogUserFilter(props: IBacklogFilter) {
  const { user } = props;
  const [pressed, setPressed] = useState(false);

  const handleUserFilterSelect = () => {
    setPressed((prevState) => !prevState);
  };

  return (
    <div className={styles.backlogUser} key={user.id}>
      <button onClick={handleUserFilterSelect}>
        {pressed ? (
          <img className={styles.backlogUserIconWithBorder} src={user.avatarIcon} alt={user.name} />
        ) : (
          <img className={styles.backlogUserIcon} src={user.avatarIcon} alt={user.name} />
        )}
      </button>
    </div>
  );
}
