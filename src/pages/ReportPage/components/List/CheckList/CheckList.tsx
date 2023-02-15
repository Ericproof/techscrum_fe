import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { capitalise } from '../../../utils';
import styles from './CheckList.module.scss';

interface Props {
  list: string[];
  prefixIcon?: JSX.Element;
}

function CheckList({ list, prefixIcon }: Props) {
  return (
    <ul className={styles.checkList}>
      {list.map((text) => (
        <li key={crypto.randomUUID()} className={styles.listItem}>
          {prefixIcon}
          {capitalise(text)}
        </li>
      ))}
    </ul>
  );
}

CheckList.defaultProps = {
  prefixIcon: <AiOutlineCheckCircle color="green" size={20} />
};

export default CheckList;
