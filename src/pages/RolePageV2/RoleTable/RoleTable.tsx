import React from 'react';
import styles from './RoleTable.module.scss';
import { IRole } from '../../../types';

interface IRoleTable {
  roles: IRole[];
  openEditHandler: () => void;
}

function RoleTable(props: IRoleTable) {
  const { roles, openEditHandler } = props;

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

  return (
    <table className={styles['roles-table-container']}>
      <thead>
        <tr>
          <th className={styles.roles}>Roles</th>
          {roles.map((role) => {
            return <th key={role.id}>{role.name}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
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
        </tr>
      </tbody>
    </table>
  );
}

export default RoleTable;
