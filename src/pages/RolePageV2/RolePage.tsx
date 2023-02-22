import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
// import components
import ProjectHeader from '../../components/ProjectHeader/ProjectHeader';
import RoleTable from './RoleTable/RoleTable';
import AddRoleBtn from './AddRoleBtn/AddRoleBtn';
// import config from '../../config/config';
import { IRole } from '../../types';
import { getRoles } from '../../api/role/role';
import styles from './RolePage.module.scss';

function RolePage() {
  const [loader, setLoader] = useState(false);
  const [roles, setRoles] = useState<IRole[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await getRoles();
        setRoles(res);
        setLoader(true);
      } catch (err) {
        setLoader(false);
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      }
    })();
  }, []);

  return (
    <>
      <ProjectHeader />
      <div className={styles['main-container']}>
        <div className={styles['header-container']}>
          <h1>Manage Roles</h1>
          <AddRoleBtn />
        </div>
        <RoleTable roles={roles} />
      </div>
    </>
  );
}

export default RolePage;
