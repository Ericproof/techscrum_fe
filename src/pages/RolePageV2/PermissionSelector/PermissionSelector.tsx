/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// import styles from './PermissionSelector.module.scss';

interface IProps {
  setName: boolean;
  submitRoleHandler: (roleName: string, permissions: Array<string>) => void;
}

function PermissionSelector(props: IProps) {
  const { setName, submitRoleHandler } = props;
  const [roleName, setRoleName] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    const view = event.target.elements;
    const newPermissions: string[] = [];
    Array.prototype.forEach.call(view, (input) => {
      if (input.checked) {
        // eslint-disable-next-line no-console
        newPermissions.push(input.id);
      }
    });
    submitRoleHandler(roleName, newPermissions);
  };

  return (
    <form onSubmit={submitHandler}>
      {setName && (
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
        <p>projects</p>
        <label htmlFor="631d94d08a05945727602ce7">
          <input type="checkbox" id="631d94d08a05945727602ce7" />
          View
        </label>
        <label htmlFor="631d94d08a05945727602ce8">
          <input type="checkbox" id="631d94d08a05945727602ce8" />
          Edit
        </label>
        <label htmlFor="631d94d08a05945727602ce9">
          <input type="checkbox" id="631d94d08a05945727602ce9" />
          Delete
        </label>
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default PermissionSelector;
