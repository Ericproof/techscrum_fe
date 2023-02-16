import React from 'react';
import styles from './Breakline.module.scss';

interface Props {
  color?: string;
}

function Breakline({ color }: Props) {
  return <div className={[styles.breakline, styles[color as string]].join(' ')} />;
}

Breakline.defaultProps = {
  color: ''
};

export default Breakline;
