import React from 'react';
import styles from 'index.module.scss';
import CooperateTabs from './CooperateTabs';
import ServicesTabs from './ServicesTabs';
import PolicyMediaTabs from './PolicyMediaTabs';

export default function index() {
  return (
    <footer>
      <CooperateTabs />
      <ServicesTabs />
      <PolicyMediaTabs />
    </footer>
  );
}
