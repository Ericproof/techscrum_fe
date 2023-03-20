import React from 'react';
import styles from './BinaryChoiceSelector.module.scss';

interface IBinaryChoiceSelectorProps {
  onChange: (value: boolean) => void;
  name: string;
  value: boolean;
  onChangeSupport?: (value: boolean) => void;
  resetSupportType?: (value: number) => void;
}
export default function BinaryChoiceSelector({
  onChange,
  name,
  value,
  resetSupportType,
  onChangeSupport
}: IBinaryChoiceSelectorProps) {
  return (
    <>
      <label htmlFor={`${name}-yes`} className={styles.radioLabel}>
        <input
          type="radio"
          name={name}
          id={`${name}-yes`}
          checked={!!value}
          onChange={() => {
            onChange(true);
            if (onChangeSupport && resetSupportType) {
              onChangeSupport(false);
              resetSupportType(0);
            }
          }}
        />
        Yes
      </label>
      <label htmlFor={`${name}-no`} className={styles.radioLabel}>
        <input
          type="radio"
          name={name}
          id={`${name}-no`}
          checked={!value}
          onChange={() => {
            onChange(false);
            if (resetSupportType) {
              resetSupportType(0);
            }
          }}
        />
        No
      </label>
    </>
  );
}

BinaryChoiceSelector.defaultProps = {
  resetSupportType: () => {},
  onChangeSupport: () => {}
};
