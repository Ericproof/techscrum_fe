/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console, no-unused-vars */
import React, { useState, useContext } from 'react';
import styles from './TypeEdit.module.scss';
import { TaskTypesContext } from '../../../context/TaskTypeProvider';

export type SelectOption = {
  id: string;
  name: string;
  icon: string;
};

type SelectProps = {
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
  updateTaskType: (newTypeId: string) => Promise<void>;
};

export default function TypeEdit({ value, onChange, updateTaskType }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const taskTypes = useContext(TaskTypesContext);

  function selectOption(option: SelectOption) {
    onChange(option);
  }

  const options = taskTypes.map((e) => ({
    id: e.id,
    name: e.name,
    icon: e.icon
  }));

  return (
    <button
      className={styles.container}
      tabIndex={0}
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={() => setIsOpen(false)}
    >
      <img src={value?.icon} alt={value?.name} className={styles.currentIcon} />
      <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
        {options
          .filter((e) => e.name !== value?.name)
          .map((option) => (
            <li
              className={styles.option}
              key={option.name}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
                updateTaskType(option.id);
              }}
            >
              <img src={option.icon} className={styles.icon} alt={option.name} />
              <span className={styles.name}>{option.name}</span>
            </li>
          ))}
      </ul>
    </button>
  );
}

TypeEdit.defaultProps = {
  value: {
    id: '',
    name: '',
    icon: ''
  }
};
