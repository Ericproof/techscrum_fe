import React from 'react';
import { IPermissions } from '../../../types';

interface IProps {
  isChecked: boolean;
  permission: IPermissions;
}

function SelectorIndicator({ isChecked, permission }: IProps) {
  return (
    <label key={permission.id} htmlFor={permission.id}>
      <input type="checkbox" id={permission.id} checked={isChecked} />
      {permission.description}
    </label>
  );
}

// PermissionIndicator.defaultProps = {
//   isChecked: false
// };

export default SelectorIndicator;
