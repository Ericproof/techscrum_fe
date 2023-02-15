import React from 'react';
import { capitalise } from '../../../utils';
import styles from './SectionWrapper.module.scss';

interface Props {
  children: React.ReactNode;
  backgroundColor?: string;
}

function SectionWrapper({ children, backgroundColor }: Props) {
  return (
    <div
      className={[styles.sectionWrapper, styles[`bg${capitalise(backgroundColor as string)}`]].join(
        ' '
      )}
    >
      {children}
    </div>
  );
}

SectionWrapper.defaultProps = {
  backgroundColor: ''
};

export default SectionWrapper;
