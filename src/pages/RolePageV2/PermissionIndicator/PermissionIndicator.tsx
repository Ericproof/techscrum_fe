import React from 'react';

interface IPermissionIndicator {
  isPermissionAllowed?: boolean;
  content: 'C' | 'R' | 'U' | 'D';
}

function PermissionIndicator({ isPermissionAllowed, content }: IPermissionIndicator) {
  return <div style={{ backgroundColor: isPermissionAllowed ? 'green' : 'red' }}>{content}</div>;
}

PermissionIndicator.defaultProps = {
  isPermissionAllowed: false
};

export default PermissionIndicator;
