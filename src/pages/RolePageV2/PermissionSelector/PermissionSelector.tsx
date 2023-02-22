// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { IPermission } from '../../../types';
// import styles from './PermissionSelector.module.scss';

interface IPermissionSelector {
  permission: IPermission[] | undefined;
}

function PermissionSelector(props: IPermissionSelector) {
  const { permission } = props;

  // const [permission, setPermission] = useState({
  //   projects: {
  //     view: false,
  //     edit: false,
  //     delete: false,
  //     create: false
  //   },
  //   broads: {
  //     view: false,
  //     edit: false,
  //     delete: false,
  //     create: false
  //   },
  //   members: {
  //     view: false,
  //     edit: false,
  //     delete: false,
  //     create: false
  //   },
  //   roles: {
  //     view: false,
  //     edit: false,
  //     delete: false,
  //     create: false
  //   }
  // });

  // const permissionTypes = Object.entries(permission);

  // eslint-disable-next-line no-unused-vars
  const permissionTypes = [
    'Projects',
    'Broads',
    'Members',
    'Roles',
    'Shortcuts',
    'Tasks',
    'settings'
  ];

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

    // eslint-disable-next-line no-console
    console.log(newPermissions);

    // const view = event.target.elements;
    // // eslint-disable-next-line no-console
    // console.log(view);
    // // eslint-disable-next-line no-console
    // console.log(event.target.elements[0].id);

    return newPermissions;
  };

  // const inputHandler = (event) => {
  //   const { target } = event;
  //   const value = target.checked;
  //   // eslint-disable-next-line no-console
  //   console.log(event);
  //   // eslint-disable-next-line no-console
  //   console.log(value);
  // };

  const permissionList = permission?.map((item) => {
    // eslint-disable-next-line no-console
    // console.log(item.slug?.split(':'));
    return (
      <label key={item.id} htmlFor={item.slug}>
        <input type="checkbox" id={item.slug} />
        {item.description}
      </label>
    );
  });

  // eslint-disable-next-line no-console
  console.log(permission);

  return (
    <form onSubmit={submitHandler}>
      {
        permissionList
        // permissionTypes.map((type) => {
        //   return (
        //     <div key={type}>
        //       <p>{`${type}:`}</p>
        //       {/* {Object.entries(type[1]).map((operation) => (
        //         <label key={`${operation[0]}-view`} htmlFor={`${operation[0]}-view`}>
        //           <input type="checkbox" id={`${operation[0]}-view`} />
        //           {operation}
        //         </label>
        //       ))} */}
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
      }
      <input type="submit" value="Submit" />
    </form>
  );
}

export default PermissionSelector;
