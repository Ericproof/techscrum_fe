import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
// import components
import Loading from '../../components/Loading/Loading';
import ProjectHeader from '../../components/ProjectHeader/ProjectHeader';
import RoleTable from './RoleTable/RoleTable';
import PermissionSelector from './PermissionSelector/PermissionSelector';
import AddRoleBtn from './AddRoleBtn/AddRoleBtn';
import { IPermissions, IRole } from '../../types';
import {
  getRoles,
  addRole,
  updateRole,
  deleteRole,
  getPermissions,
  getOneRoles
} from '../../api/role/role';
import styles from './RolePage.module.scss';
import RoleNav from './RoleNav/roleNav';

function RolePage() {
  const [loader, setLoader] = useState(false);
  const { projectId = '' } = useParams();
  const [roles, setRoles] = useState<IRole[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editRole, setEditRole] = useState('');
  const [selectedRole, setSelectedRole] = useState<IRole>({ id: '', permission: [] });
  const [permissions, setPermissions] = useState<IPermissions[]>([]);
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
    (async () => {
      try {
        const res = await getPermissions();
        // 每次点开form都要读一次
        // eslint-disable-next-line no-console
        setPermissions(res);
      } catch (err) {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      }
    })();
    fetchRoles();
  }, [fetchRoles]);

  const newRoleHandler = () => {
    setEditRole('EDIT');
    setOpenEdit(true);
  };

  const editRoleHandler = async (roleId: string) => {
    const Role = await getOneRoles(projectId, roleId);
    setEditRole(roleId);
    setSelectedRole(Role);
    setOpenEdit(true);
  };

  const deleteRoleHanlder = async (roleId: string) => {
    setEditRole('');
    try {
      setLoader(true);
      await deleteRole(projectId, roleId);
    } catch (err) {
      setLoader(false);
      toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
    } finally {
      fetchRoles();
    }
  };

  const submitEditHandler = async (
    role: string,
    newPermissions: Array<string>,
    newRole: boolean
  ) => {
    setOpenEdit(false);
    setEditRole('');
    try {
      setLoader(true);
      if (newRole) {
        await addRole(projectId, role, newPermissions);
      } else {
        await updateRole(projectId, role, newPermissions);
      }
      // setRoles(res);
    } catch (err) {
      setLoader(false);
      toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
    } finally {
      fetchRoles();
    }
  };

  const closeHandler = () => {
    setOpenEdit(false);
  };

  // const permissions = roles
  //   .find((el) => {
  //     console.log(el.id.toString());
  //     return el.id === '63fae6712253ac9017308145';
  //   })
  //   ?.permission.map((el) => el.slug);
  // console.log(permissions);

  return (
    <div className={[styles['page-container'], openEdit && styles.active].join(' ')}>
      <ProjectHeader />
      <div className={styles['main-container']}>
        <RoleNav />
        <div className={styles['header-container']}>
          <h1>Manage Roles</h1>
          <AddRoleBtn addRole={newRoleHandler} />
        </div>
        {loader ? (
          <Loading />
        ) : (
          <RoleTable roles={roles} editRole={editRoleHandler} deleteRole={deleteRoleHanlder} />
        )}
        {openEdit && (
          <PermissionSelector
            setName={editRole}
            submitRoleHandler={submitEditHandler}
            closeHandler={closeHandler}
            permissions={permissions}
            role={selectedRole}
          />
        )}
      </div>
    </div>
  );
}

export default RolePage;
