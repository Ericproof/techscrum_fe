import React from 'react';
import { capitalise } from '../../utils';
import styles from './BasicFlex.module.scss';

interface Props {
  children: React.ReactNode;
  flexGrowRatio?: 'even' | 'toRight' | 'toLeft';
  gap?: 'small' | 'medium' | 'large';
}

function BasicFlex({ children, flexGrowRatio, gap }: Props) {
  return (
    <div
      className={[
        styles.basicFlex,
        styles[`basicFlex${capitalise(flexGrowRatio as string)}`],
        styles[`basicFlex${capitalise(gap as string)}`]
      ].join(' ')}
    >
      {children}
    </div>
  );
}

BasicFlex.defaultProps = {
  flexGrowRatio: 'even',
  gap: 'small'
};

export default BasicFlex;
