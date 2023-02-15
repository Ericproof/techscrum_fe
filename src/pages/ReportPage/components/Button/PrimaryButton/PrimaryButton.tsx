import React from 'react';
import { capitalise } from '../../../utils';
import styles from './PrimaryButton.module.scss';

interface Props {
  btnTitle: string;
  btnBackgroundColor?: 'green' | 'brand' | 'blue' | 'pink' | '';
  fullWidth?: boolean;
}

function PrimaryButton({ btnTitle, btnBackgroundColor, fullWidth }: Props) {
  return (
    <button
      className={[
        styles.buttonPrimary,
        styles[`btnColor${capitalise(btnBackgroundColor as string)}`],
        styles[fullWidth ? 'btnFullWidth' : '']
      ].join(' ')}
    >
      {btnTitle}
    </button>
  );
}

PrimaryButton.defaultProps = {
  btnBackgroundColor: 'brand',
  fullWidth: false
};

export default PrimaryButton;
