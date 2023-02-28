import React, { useState } from 'react';
import { GrAddCircle } from 'react-icons/gr';
import { HiDotsHorizontal } from 'react-icons/hi';
import { ImCancelCircle } from 'react-icons/im';
import styles from './RoleTable.module.scss';
import { IRole } from '../../../types';

interface IRoleTable {
  roles: IRole[];
  editRole: (roleId: string) => void;
  deleteRole: (roleId: string) => void;
}

function RoleTable(props: IRoleTable) {
  // eslint-disable-next-line no-unused-vars
  const { roles, editRole, deleteRole } = props;
  const [selectRole, setSelectRole] = useState('');

  // // eslint-disable-next-line no-unused-vars
  // const permissionList = role?.permission?.map((item) => {
  //   // eslint-disable-next-line no-console
  //   // console.log(item.slug?.split(':')[1] === 'projects');
  //   return (
  //     <label key={item.id} htmlFor={item.slug}>
  //       <input type="checkbox" id={item.slug} />
  //       {item.description}
  //     </label>
  //   );
  // });
  const operationList = [
    'projects',
    'boards',
    'members',
    'roles',
    'shortcuts',
    'tasks',
    'settings'
  ];

  const openMoreHandler = (e) => {
    setSelectRole(e.target.value);
  };

  const editRoleHandler = () => {
    editRole(selectRole);
    setSelectRole('');
  };

  const deleteRoleHandler = () => {
    deleteRole(selectRole);
    setSelectRole('');
  };

  const operationFilter = (operation: string, permissions: Array<any>): Array<string> => {
    return permissions
      .filter((permission) => {
        const seperation = permission.slug.split(':');
        return seperation[1] === operation;
      })
      .map((permission) => {
        const seperation = permission.slug.split(':');
        return `${seperation[0]} `;
      });
  };

  return (
    <table className={styles['roles-table-container']}>
      <thead>
        <tr className={styles['role-header']}>
          <th>Roles</th>
          {operationList.map((el) => {
            return <th key={el}>{el}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {roles.map((role) => {
          return (
            <tr className={styles['role-body']} key={role.id}>
              <th className={styles.permissions}>{role.name}</th>
              {operationList.map((el) => {
                return <th key={el}>{operationFilter(el, role.permission)}</th>;
              })}
              <th className={styles['moreBtn-container']}>
                <button value={role.id} onMouseEnter={openMoreHandler}>
                  <HiDotsHorizontal color="white" size="20px" />
                </button>
                <ul className={styles['drop-down']}>
                  <li>
                    <button onClick={editRoleHandler}>
                      <GrAddCircle />
                    </button>
                  </li>
                  <li>
                    <button onClick={deleteRoleHandler}>
                      <ImCancelCircle />
                    </button>
                  </li>
                </ul>
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default RoleTable;
