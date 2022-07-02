import React from 'react';
import CooperateTabs from './CooperateTabs/CooperateTabs';
import PolicyMediaTabs from './PolicyMediaTabs/PolicyMediaTabs';

export default function index() {
  return (
    <footer>
      <CooperateTabs />
      <PolicyMediaTabs />
    </footer>
  );
}
