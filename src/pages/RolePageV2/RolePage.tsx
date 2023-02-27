import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
// import components
import Loading from '../../components/Loading/Loading';
import ProjectHeader from '../../components/ProjectHeader/ProjectHeader';
import RoleTable from './RoleTable/RoleTable';
import PermissionSelector from './PermissionSelector/PermissionSelector';
import AddRoleBtn from './AddRoleBtn/AddRoleBtn';
import { IRole } from '../../types';
import { getRoles, addRole, updateRole } from '../../api/role/role';
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
  const [editRole, setEditName] = useState('');
  // const [roleState, dispatchRole] = useReducer(roleReducer, { roleName: '', permission: [] });

  const fetchRoles = useCallback(async () => {
    try {
      setLoader(true);
      const res = await getRoles(projectId);
      setRoles(res);
    } catch (err) {
      setLoader(false);
      toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
    } finally {
      setLoader(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const newRoleHandler = () => {
    setOpenEdit(true);
    setEditName('EDIT');
  };

  const submitEditHandler = async (role: string, permissions: Array<string>, newRole: boolean) => {
    setOpenEdit(false);
    setEditName('');
    try {
      setLoader(true);
      if (newRole) {
        await addRole(projectId, role, permissions);
      } else {
        await updateRole(projectId, role, permissions);
      }
      // setRoles(res);
    } catch (err) {
      setLoader(false);
      toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
    } finally {
      fetchRoles();
    }
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
        {loader ? <Loading /> : <RoleTable roles={roles} />}
        {openEdit && (
          <PermissionSelector setName={editRole} submitRoleHandler={submitEditHandler} />
        )}
      </div>
    </>
  );
}

export default RolePage;
