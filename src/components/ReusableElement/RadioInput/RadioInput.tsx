import React from 'react';
import styles from './RadioInput.module.scss';

interface IRadioInput {
  onChange: (id: string, value: boolean) => void;
  id: string;
  name: string;
}
export default function RadioInput({ onChange, id, name }: IRadioInput) {
  return (
    <>
      <label htmlFor={id} className={styles.radioLabel}>
        <input
          type="radio"
          name={name}
          id={id}
          onChange={() => {
            onChange(id, true);
          }}
        />
        Yes
      </label>
      <label htmlFor={id} className={styles.radioLabel}>
        <input
          type="radio"
          name={name}
          id={id}
          onChange={() => {
            onChange(id, false);
          }}
        />
        No
      </label>
    </>
  );
}
