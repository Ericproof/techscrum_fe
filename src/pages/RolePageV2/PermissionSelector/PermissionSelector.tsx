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
  const [errorMsg, setErrorMsg] = useState('');
  const [errorActive, setErrorActive] = useState(false);

  const operationList = [
    'projects',
    'boards',
    'members',
    'roles',
    'shortcuts',
    'tasks',
    'settings'
  ];

  const defaultFomat = (operation: string, defaultPermissions: Array<any>) => {
    return defaultPermissions
      .filter((permission) => {
        const seperation = permission?.slug.split(':');
        return seperation[1] === operation;
      })
      .map((el) => {
        return <SelectorIndicator key={el.id} isChecked={false} permission={el} />;
      });
  };

  const operationFilter = (
    operation: string,
    defaultPermissions: Array<any>,
    selectedPermissions: Array<any>
  ) => {
    const permissionForm = defaultPermissions.filter((permission) => {
      const seperation = permission?.slug.split(':');
      return seperation[1] === operation;
    });

    const seletedForm = selectedPermissions
      .filter((permission) => {
        const seperation = permission?.slug.split(':');
        return seperation[1] === operation;
      })
      .map((el) => el.id);
    return permissionForm.map((el) => {
      if (seletedForm.indexOf(el.id) === -1)
        return <SelectorIndicator key={el.id} isChecked={false} permission={el} />;
      return <SelectorIndicator key={el.id} isChecked permission={el} />;
    });
  };

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
      if (!roleName) {
        setErrorActive(true);
        setErrorMsg('please Enter a valid role name!!!');
        return;
      }

      if (newPermissions.length === 0) {
        setErrorActive(true);
        setErrorMsg('please select at least one permission!!!');
        return;
      }
      submitRoleHandler(roleName, newPermissions, true);
    } else {
      submitRoleHandler(setName, newPermissions, false);
    }
  };

  return (
    <div className={styles['popup-container']}>
      <div>{setName === 'EDIT' ? <h1>Add New Role</h1> : <h1>Edit Permissions</h1>}</div>
      <form
        onSubmit={submitHandler}
        onChange={() => {
          setErrorActive(false);
        }}
      >
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
                {setName === 'EDIT'
                  ? defaultFomat(el, permissions)
                  : operationFilter(el, permissions, role.permission)}
              </div>
            );
          })}
        </div>
        <div>{errorActive && <p>{errorMsg}</p>}</div>
        <input type="submit" value="Submit" />
        <input type="button" value="close" onClick={closeHandler} />
      </form>
    </div>
  );
}

export default PermissionSelector;
