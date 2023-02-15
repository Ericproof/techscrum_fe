import React from 'react';
import { AiFillCloseSquare } from 'react-icons/ai';
import styles from './StaffDetail.module.scss';
import MaleAvatar from '../../../../assets/team2/male_avatar.svg';
import FemaleAvatar from '../../../../assets/team2/female_avatar.svg';

interface IStaff {
  name: string;
  image?: string;
  description?: string;
  gender: 'male' | 'female';
  position: 'ceo' | 'business analyst' | 'developer';
}

function StaffDetail(props: IStaff) {
  const { name, image, gender, position, description } = props;
  const imageShow = image || (gender === 'male' ? MaleAvatar : FemaleAvatar);
  return (
    <div className={styles['intro-container']}>
      <div className={styles.closeBtn}>
        <AiFillCloseSquare style={{ fontSize: '50px' }} />
      </div>
      <div className={styles['inner-container']}>
        <div className={styles['detail-img']}>
          <img className={styles.staffImg} src={imageShow} alt={name} />
        </div>
        <div className={styles['detail-header']}>
          <h3 className={styles.staffName}>{name}</h3>
          <h4 className={styles.position}>{position}</h4>
        </div>
        <div className={styles['detail-intro']}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

StaffDetail.defaultProps = {
  image: undefined,
  description: undefined
};

export default StaffDetail;
