/* eslint-disable no-console */
import React from 'react';
import styles from './DefaultModalBody.module.scss';

interface IPropsDefaultModalHeader {
  defaultPadding?: boolean;
  classesName?: string | string[];
  children?: React.ReactNode;
  fullWidth?: boolean;
}

export default function DefaultModalHeader(props: IPropsDefaultModalHeader) {
  const { classesName, defaultPadding = true, fullWidth, children = null } = props;
  return (
    <div
      className={[
        defaultPadding ? styles.defaultPadding : '',
        fullWidth ? styles.fullWidth : '',
        classesName
      ].join(' ')}
    >
      {children}
    </div>
  );
}

DefaultModalHeader.defaultProps = {
  classesName: '',
  defaultPadding: true,
  children: null,
  fullWidth: false
};
