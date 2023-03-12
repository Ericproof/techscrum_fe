import React from 'react';
import styles from './RadioInput.module.scss';

interface IRadioInput {
  onChange: (value: boolean) => void;
  name: string;
  value: boolean;
}
export default function RadioInput({ onChange, name, value }: IRadioInput) {
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
          }}
        />
        No
      </label>
    </>
  );
}
