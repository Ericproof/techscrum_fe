import React from 'react';
import MaleAvatar from '../../../assets/team2/male_avatar.svg';
import FemaleAvatar from '../../../assets/team2/female_avatar.svg';

interface IStaff {
  name: string;
  image?: string;
  gender: 'male' | 'female';
  position: 'ceo' | 'business analyst' | 'developer';
}

function StaffInfo(props: IStaff) {
  const { name, image, gender, position } = props;
  const imageShow = image || (gender === 'male' ? MaleAvatar : FemaleAvatar);
  return (
    <div>
      <img src={imageShow} alt={name} />
      <div>
        <p>{name}</p>
        <p>{position}</p>
      </div>
    </div>
  );
}

StaffInfo.defaultProps = {
  image: undefined
};

export default StaffInfo;
