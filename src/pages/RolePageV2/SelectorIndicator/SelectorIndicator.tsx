import React, { useState } from 'react';
import { IPermissions } from '../../../types';

interface IProps {
  isChecked: boolean;
  permission: IPermissions;
}

function SelectorIndicator({ isChecked, permission }: IProps) {
  const [checked, setChecked] = useState(isChecked);

  return (
    <label key={permission.id} htmlFor={permission.id}>
      <input
        type="checkbox"
        id={permission.id}
        onChange={(e) => setChecked(e.target.checked)}
        checked={checked}
      />
      {permission.description}
    </label>
  );
}

export default SelectorIndicator;
