import React from 'react';
import { capitalise } from '../../utils';
import styles from './BasicFlex.module.scss';

interface Props {
  children: React.ReactNode;
  flexGrowRatio?: 'even' | 'moreOnRight' | 'moreOnLeft';
  gap?: 'small' | 'medium' | 'large';
  isFlexReverse?: boolean;
}

function BasicFlex({ children, flexGrowRatio, gap, isFlexReverse }: Props) {
  return (
    <div
      className={[
        styles.basicFlex,
        styles[`basicFlex${capitalise(flexGrowRatio as string)}`],
        styles[`basicFlex${capitalise(gap as string)}`],
        styles[`basicFlex${capitalise(isFlexReverse ? 'reverse' : '')}`]
      ].join(' ')}
    >
      {children}
    </div>
  );
}

BasicFlex.defaultProps = {
  flexGrowRatio: 'even',
  gap: 'small',
  isFlexReverse: false
};

export default BasicFlex;
