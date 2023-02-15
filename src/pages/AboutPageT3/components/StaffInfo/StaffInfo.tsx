import React from 'react';
import MaleAvatar from '../../../../assets/team2/male_avatar.svg';
import FemaleAvatar from '../../../../assets/team2/female_avatar.svg';
import styles from './StaffInfo.module.scss';

interface IStaffInfo {
  name: string;
  image?: string;
  gender: 'male' | 'female';
  position: 'ceo' | 'business analyst' | 'developer';
  openDetail: (name: string) => void;
}

function StaffInfo(props: IStaffInfo) {
  const { name, image, gender, position, openDetail } = props;
  const imageShow = image || (gender === 'male' ? MaleAvatar : FemaleAvatar);
  return (
    <>
      <div role="presentation" onClick={() => openDetail(name)}>
        <img className={styles.staffImg} src={imageShow} alt={name} />
      </div>
      <div className={styles.infoContainer}>
        <h4>{name}</h4>
        <p className={styles.position}>{position}</p>
      </div>
    </>
  );
}

StaffInfo.defaultProps = {
  image: undefined
};

export default StaffInfo;
