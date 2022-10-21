import React from 'react';
import styles from './RadioInput.module.scss';

interface IRadioInput {
  onChange: () => void;
  id: string;
  name: string;
  content: string;
}
export default function RadioInput({ onChange, id, name, content }: IRadioInput) {
  return (
    <label htmlFor={id} className={styles.radioLabel}>
      <input type="radio" name={name} id={id} onChange={onChange} />
      {content}
    </label>
  );
}
