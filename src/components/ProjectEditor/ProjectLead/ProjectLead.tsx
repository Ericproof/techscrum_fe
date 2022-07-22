import React, { useEffect, useState } from 'react';
import { getUsers } from '../../../api/user/user';
import userAvatar from '../../../assets/userAvatar.png';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import { IOnChangeProjectLead } from '../../../types';
import UserSelect from '../../Form/Select/UserSelect/UserSelect';
import styles from './ProjectLead.module.scss';

interface IProjectLead {
  onChange: (e: IOnChangeProjectLead) => void;
  value: any;
}

export default function ProjectLead(props: IProjectLead) {
  const { onChange, value } = props;

  return (
    <div className={styles.leadDropdownMenu}>
      <span> Project lead</span>
      <UserSelect onChange={onChange} value={value} />
      <p>Make sure your project lead has access to issues in the project.</p>
    </div>
  );
}
