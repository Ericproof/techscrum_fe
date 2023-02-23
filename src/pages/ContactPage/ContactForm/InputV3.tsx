/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import styles from './InputV3.module.scss';

interface IInputV3 {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  identifier: string;
  label: string;
  type: 'text' | 'email' | 'password';
  defaultValue?: string;
  required?: boolean;
  placeHolder?: string;
  regex?: RegExp;
  errMsg?: string;
  classes?: string | string[];
}

export default function InputV3(props: IInputV3) {
  const {
    value,
    onChange,
    onBlur,
    label,
    identifier,
    type,
    defaultValue,
    required,
    placeHolder,
    regex,
    errMsg,
    classes
  } = props;

  const [isValid, setIsValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (regex && value) {
      setIsValid(regex.test(value));

      console.log(isValid);
    }
  }, [regex, value, isValid]);

  const onBlurHandler = () => {
    if (!value) {
      setIsFocused(false);
    }
  };

  return (
    <div>
      <div className={styles.inputField}>
        <label
          htmlFor={identifier}
          className={isFocused ? `${styles.label} ${styles.label__focused}` : styles.label}
        >
          {label}
        </label>
        <input
          id={identifier}
          className={styles.input}
          type={type}
          data-cy={`${identifier}-input-cy`}
          value={value}
          autoComplete="off"
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={onBlurHandler}
          aria-invalid={isValid ? 'false' : 'true'}
          aria-describedby={`${identifier}-accessible-msg`}
        />
      </div>
      {!isValid && (
        <p id={`${identifier}-accessible-msg`} className={styles.errMsg}>
          {errMsg}
        </p>
      )}
    </div>
  );
}

InputV3.defaultProps = {
  required: false,
  onBlur: null,
  defaultValue: null,
  placeHolder: null,
  regex: null,
  errMsg: null,
  classes: null
};
