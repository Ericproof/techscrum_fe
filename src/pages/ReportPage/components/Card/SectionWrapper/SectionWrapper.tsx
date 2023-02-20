import React from 'react';
import { capitalise } from '../../../utils';
import styles from './SectionWrapper.module.scss';

interface Props {
  children: React.ReactNode;
  backgroundColor?: 'blue' | 'pink' | 'purple' | 'green' | 'default' | '';
  extended?: boolean;
}

function SectionWrapper({ children, backgroundColor, extended }: Props) {
  return (
    <div
      className={[
        styles.sectionWrapper,
        styles[`bg${capitalise(backgroundColor as string)}`],
        styles[extended ? 'extended' : '']
      ].join(' ')}
    >
      {children}
    </div>
  );
}

SectionWrapper.defaultProps = {
  backgroundColor: '',
  extended: false
};

export default SectionWrapper;
