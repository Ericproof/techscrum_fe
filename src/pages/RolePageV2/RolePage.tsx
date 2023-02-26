/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useReducer } from 'react';
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

// const roleReducer = (state, action) => {
//   if (action.type === 'CREATE') {
//     return { roleName: '', permission: [] };
//   }
//   if (action.type === 'EDIT') {
//     return { id: '', permission: [] };
//   }
//   return { roleName: '', permission: [] };
// };

function RolePage() {
  const [loader, setLoader] = useState(false);
  const { projectId = '' } = useParams();
  const [roles, setRoles] = useState<IRole[]>([]);
  // edit role
  const [openEdit, setOpenEdit] = useState(false);
  const [editName, setEditName] = useState(false);

  // const [roleState, dispatchRole] = useReducer(roleReducer, { roleName: '', permission: [] });

  useEffect(() => {
    (async () => {
      try {
        const res = await getRoles(projectId);
        setRoles(res);
        setLoader(true);
      } catch (err) {
        setLoader(false);
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      }
    })();
  }, [projectId]);

  const newRoleHandler = () => {
    setOpenEdit(true);
    setEditName(true);
  };

  const submitEditHandler = () => {
    setOpenEdit(false);
    setEditName(false);
  };

  // const permissions = roles
  //   .find((el) => {
  //     console.log(el.id.toString());
  //     return el.id === '63fae6712253ac9017308145';
  //   })
  //   ?.permission.map((el) => el.slug);
  // console.log(permissions);

  return (
    <>
      <ProjectHeader />
      <div className={styles['main-container']}>
        <RoleNav />
        <div className={styles['header-container']}>
          <h1>Manage Roles</h1>
          <AddRoleBtn addRole={newRoleHandler} />
        </div>
        <RoleTable roles={roles} />
        {openEdit && <PermissionSelector setName={editName} />}
      </div>
    </>
  );
}

export default RolePage;
