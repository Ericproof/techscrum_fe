import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
// import components
import { useParams } from 'react-router-dom';
import ProjectHeader from '../../components/ProjectHeader/ProjectHeader';
import RoleTable from './RoleTable/RoleTable';
import PermissionSelector from './PermissionSelector/PermissionSelector';
import AddRoleBtn from './AddRoleBtn/AddRoleBtn';
import { IRole } from '../../types';
import { getRoles } from '../../api/role/role';
import styles from './RolePage.module.scss';
import RoleNav from './RoleNav/roleNav';

function RolePage() {
  // const [loader, setLoader] = useState(false);
  const { projectId = '' } = useParams();
  const [roles, setRoles] = useState<IRole[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const res = await getRoles(projectId);
        // eslint-disable-next-line no-console
        console.log(res);
        setRoles(res);
        // setLoader(true);
      } catch (err) {
        // setLoader(false);
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      }
    })();
  }, [projectId]);

  const openEditHandler = () => {
    setOpenEdit(true);
  };

  return (
    <>
      <ProjectHeader />
      <div className={styles['main-container']}>
        <RoleNav />
        <div className={styles['header-container']}>
          <h1>Manage Roles</h1>
          <AddRoleBtn />
        </div>
        <RoleTable roles={roles} openEditHandler={openEditHandler} />
        {openEdit && <PermissionSelector />}
      </div>
    </>
  );
}

export default RolePage;
