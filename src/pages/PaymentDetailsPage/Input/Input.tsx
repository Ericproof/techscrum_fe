import React, { useEffect, useState } from 'react';
import { CiWarning } from 'react-icons/ci';
import { AiOutlineCheck } from 'react-icons/ai';
import styles from './Input.module.scss';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

interface Props {
  invoiceEmail?: string;
  isEditing: boolean;
  onValueChange: (newValue: string) => void;
  onValidChange: (isFormValid: boolean) => void;
}

export default function Input({ invoiceEmail, isEditing, onValueChange, onValidChange }: Props) {
  const [value, setValue] = useState(invoiceEmail);
  const [isValid, setIsValid] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const onBlurHandler = () => {
    setIsFocused(false);
  };

  const inputClassName = isFocused ? `${styles.input} ${styles.input__focused}` : styles.input;

  useEffect(() => {
    if (value?.length) {
      setIsValid(EMAIL_REGEX.test(value));
      onValidChange(isValid);
    }
  }, [value, onValidChange, isValid]);

  return isEditing ? (
    <div className={styles.container}>
      <input
        type="email"
        className={inputClassName}
        autoComplete="off"
        onFocus={() => setIsFocused(true)}
        onBlur={onBlurHandler}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onValueChange(e.target.value);
        }}
      />

      {value && (
        <div className={styles.inputStatus}>
          {isValid ? <AiOutlineCheck color="green" /> : <CiWarning color="red" />}
        </div>
      )}
    </div>
  ) : (
    <p className={styles.loadedEmail}>{invoiceEmail}</p>
  );
}

Input.defaultProps = {
  invoiceEmail: ''
};
