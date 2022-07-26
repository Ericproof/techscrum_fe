import React from 'react';

interface IPropsRow {
  children?: React.ReactNode;
  classesName?: string;
}

export default function Row(props: IPropsRow) {
  const { children, classesName } = props;
  return <div className={['flex alignCenter', classesName].join(' ')}>{children}</div>;
}

Row.defaultProps = {
  children: null,
  classesName: ''
};
