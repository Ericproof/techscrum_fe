import React from 'react';
import styles from './ButtonV2.module.scss';

interface IPropsButtonV2 {
  text: string;
  onClick: (e: any) => void;
  customStyles?: string;
  danger?: boolean;
  loading?: boolean;
  fill?: boolean;
}

export default function ButtonV2(props: IPropsButtonV2) {
  const { text, customStyles = '', onClick, danger = false, loading = false, fill = false } = props;
  return (
    <button
      type="button"
      className={[
        styles.buttonV2,
        customStyles || '',
        danger ? styles.danger : '',
        fill ? styles.fill : ''
      ].join(' ')}
      onClick={onClick}
      disabled={loading}
    >
      {text}
    </button>
  );
}

ButtonV2.defaultProps = {
  customStyles: '',
  danger: false,
  loading: false,
  fill: false
};
