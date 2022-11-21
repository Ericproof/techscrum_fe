/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import DropdownV2 from '../../lib/FormV2/DropdownV2/DropdownV2';
import InputV2 from '../../lib/FormV2/InputV2/InputV2';
import { IOptions } from '../../types';

interface ButtonProps {
  label: string;

  onClick?: () => void;

  dataTestId?: string;

  loading?: boolean;

  name?: string;

  options?: IOptions[];
}

/**
 * Primary UI component for user interaction
 */
export function DropdownV2Example({
  dataTestId = '',
  label,
  loading = false,
  name = 'dropdownV2',
  ...props
}: ButtonProps) {
  return (
    <DropdownV2
      label={label}
      loading={loading}
      onValueChanged={() => {}}
      name={name}
      defaultValue="1"
      options={[
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' }
      ]}
    />
  );
}
