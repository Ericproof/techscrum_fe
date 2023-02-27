import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getPermissions } from '../../../api/role/role';
import { IPermissions } from '../../../types';
// import styles from './PermissionSelector.module.scss';

interface IProps {
  setName: string;
  submitRoleHandler: (role: string, permissions: Array<string>, newRole: boolean) => void;
}

function PermissionSelector(props: IProps) {
  // setName === 'EDIT' or 'roleId'
  const { setName, submitRoleHandler } = props;
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState<IPermissions[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getPermissions();
        setPermissions(res);
      } catch (err) {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      }
    })();
  }, []);

  const operationList = [
    'projects',
    'boards',
    'members',
    'roles',
    'shortcuts',
    'tasks',
    'settings'
  ];

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const operationFilter = (operation: string, permissions: Array<any>) => {
    return permissions
      .filter((permission) => {
        const seperation = permission?.slug.split(':');
        return seperation[1] === operation;
      })
      .map((permission) => {
        return (
          <label key={permission.id} htmlFor={permission.id}>
            <input type="checkbox" id={permission.id} />
            {permission.description}
          </label>
        );
      });
  };

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
      {/* {
        // permissionList
        permissionTypes.map((type) => {
          return (
            <div key={type}>
              <p>{`${type}:`}</p>
              <label htmlFor={`view:${type}`}>
                <input type="checkbox" id={`view:${type}`} />
                View
              </label>
              <label htmlFor={`edit:${type}`}>
                <input type="checkbox" id={`edit:${type}`} />
                Edit
              </label>
              <label htmlFor={`delete:${type}`}>
                <input type="checkbox" id={`delete:${type}`} />
                Delete
              </label>
              <label htmlFor={`boards:${type}`}>
                <input type="checkbox" id={`boards:${type}`} />
                Create
              </label>
            </div>
          );
        })
      } */}
      <div>
        {operationList.map((el) => {
          return (
            <div key={el}>
              <p>{`${el}:`}</p>
              {operationFilter(el, permissions)}
            </div>
          );
        })}
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default PermissionSelector;
