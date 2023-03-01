/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { IPermissions, IRole } from '../../../types';
import styles from './PermissionSelector.module.scss';
import SelectorIndicator from '../SelectorIndicator/SelectorIndicator';

interface IProps {
  setName: string;
  submitRoleHandler: (role: string, permissions: Array<string>, newRole: boolean) => void;
  closeHandler: () => void;
  permissions: IPermissions[];
  role: IRole;
}

function PermissionSelector(props: IProps) {
  // setName === 'EDIT' or 'roleId'
  const { setName, submitRoleHandler, closeHandler, permissions, role } = props;
  const [roleName, setRoleName] = useState('');
  console.log(role);

  const operationList = [
    'projects',
    'boards',
    'members',
    'roles',
    'shortcuts',
    'tasks',
    'settings'
  ];

  // const defaultTemplete = ['create', 'read', 'update', 'delete'];

  const operationFilter = (
    operation: string,
    defaultPermissions: Array<any>,
    selectedPermissions: Array<any>
  ) => {
    const permissionForm = defaultPermissions.filter((permission) => {
      const seperation = permission?.slug.split(':');
      return seperation[1] === operation;
    });

    let seletedForm;
    if (selectedPermissions) {
      seletedForm = selectedPermissions
        .filter((permission) => {
          const seperation = permission?.slug.split(':');
          return seperation[1] === operation;
        })
        .map((el) => el.id);
    }
    console.log(seletedForm);

    return permissionForm.map((el) => {
      if (seletedForm.indexOf(el.id) === -1)
        return <SelectorIndicator key={el.id} isChecked={false} permission={el} />;
      return <SelectorIndicator key={el.id} isChecked permission={el} />;
    });

    //   return defaultPermissions
    //     .filter((permission) => {
    //       const seperation = permission?.slug.split(':');
    //       return seperation[1] === operation;
    //     })
    //     .map((permission) => {
    //       return (
    //         <label key={permission.id} htmlFor={permission.id}>
    //           <input type="checkbox" id={permission.id} />
    //           {permission.description}
    //         </label>
    //       );
    //     });
    // });
  };

  // return <SelectorIndicator key={el.id} isChecked permission={el} />;
  // .map((permission) => {
  //   return (
  //     <label key={permission.id} htmlFor={permission.id}>
  //       <input type="checkbox" id={permission.id} />
  //       {permission.description}
  //     </label>
  //   );
  // });

  // const editForm = permissions.map((permission) => {
  //   return (
  //     <label key={permission.id} htmlFor={permission.id}>
  //       <input type="checkbox" id={permission.id} />
  //       {permission.description}
  //     </label>
  //   );
  // });

  const submitHandler = (event) => {
    event.preventDefault();

    const view = event.target.elements;
    const newPermissions: string[] = [];
    Array.prototype.forEach.call(view, (input) => {
      if (input.checked) {
        newPermissions.push(input.id);
      }
    });
    if (setName === 'EDIT') {
      submitRoleHandler(roleName, newPermissions, true);
    } else {
      submitRoleHandler(setName, newPermissions, false);
    }
  };

  return (
    <div className={styles['popup-container']}>
      <form onSubmit={submitHandler}>
        {setName === 'EDIT' && (
          <label htmlFor="roleName">
            Role name:
            <input
              name="roleName"
              onChange={(e) => {
                setRoleName(e.target.value);
              }}
            />
          </label>
        )}
        <div>
          {operationList.map((el) => {
            return (
              <div key={el}>
                <p>{`${el}:`}</p>
                {operationFilter(el, permissions, role.permission)}
              </div>
            );
          })}
        </div>
        <input type="submit" value="Submit" />
        <input type="submit" value="close" onClick={closeHandler} />
      </form>
    </div>
  );
}
// PermissionSelector.defaultProps = {
//   role: {}
// };

// permissionList
// permissionTypes.map((type) => {
//   return (
//     <div key={type}>
//       <p>{`${type}:`}</p>
//       <label htmlFor={`view:${type}`}>
//         <input type="checkbox" id={`view:${type}`} />
//         View
//       </label>
//       <label htmlFor={`edit:${type}`}>
//         <input type="checkbox" id={`edit:${type}`} />
//         Edit
//       </label>
//       <label htmlFor={`delete:${type}`}>
//         <input type="checkbox" id={`delete:${type}`} />
//         Delete
//       </label>
//       <label htmlFor={`boards:${type}`}>
//         <input type="checkbox" id={`boards:${type}`} />
//         Create
//       </label>
//     </div>
//   );
// })
export default PermissionSelector;
