/* eslint-disable no-console */
import React from 'react';
import styles from './RoleTable.module.scss';
import { IRole } from '../../../types';

interface IRoleTable {
  roles: IRole[];
}

function RoleTable(props: IRoleTable) {
  // eslint-disable-next-line no-unused-vars
  const { roles } = props;

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
        <tr>
          <th className={styles.roles}>Roles</th>
          {operationList.map((el) => {
            return <th key={el}>{el}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {roles.map((role) => {
          return (
            <tr key={role.id}>
              <th className={styles.permissions}>{role.name}</th>
              {operationList.map((el) => {
                return <th key={el}>{operationFilter(el, role.permission)}</th>;
              })}
            </tr>
          );
        })}
        {/* <tr>
          <th className={styles.permissions}>Permissions</th>
          {roles.map((role) => {
            const { permission } = role;
            return (
              <th key={role.id}>
                {permission?.map((item) => {
                  // eslint-disable-next-line no-console
                  // console.log(item.slug?.split(':')[1] === 'projects');
                  return (
                    <div key={item.id}>
                      <p>{item.description}</p>
                    </div>
                  );
                })}
                <button onClick={openEditHandler}>edit permissions</button>
              </th>
            );
          })}
        </tr> */}
      </tbody>
    </table>
  );
}

export default RoleTable;
