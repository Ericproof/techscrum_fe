import React, { Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProjectMemberTitle.module.scss';

interface Props {
  setInviteFormVisible: Dispatch<boolean>;
}

export default function ProjectMemberHeader({ setInviteFormVisible }: Props) {
  const navigate = useNavigate();
  return (
    <div className={styles.projectMemberHeaderContainer}>
      <h1>Access</h1>
      <div>
        <button onClick={() => setInviteFormVisible(true)}>Add Member</button>
        <button onClick={() => navigate('/roles')}>Manage Role</button>
      </div>
    </div>
  );
}
