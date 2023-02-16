import React from 'react';
import { capitalise } from '../../../utils';
import styles from './PrimaryButton.module.scss';

interface Props {
  btnTitle: string;
  btnBackgroundColor?: 'green' | 'brand' | 'blue' | 'pink' | 'default' | '';
  isFullWidth?: boolean;
}

function PrimaryButton({ btnTitle, btnBackgroundColor, isFullWidth }: Props) {
  return (
    <button
      className={[
        styles.buttonPrimary,
        styles[`btnColor${capitalise(btnBackgroundColor as string)}`],
        styles[isFullWidth ? 'btnFullWidth' : '']
      ].join(' ')}
    >
      {btnTitle}
    </button>
  );
}

PrimaryButton.defaultProps = {
  btnBackgroundColor: 'default',
  isFullWidth: false
};

export default PrimaryButton;
