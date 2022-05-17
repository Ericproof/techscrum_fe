import React from 'react';
import styles from './index.module.scss';
import Tab from './Tabs';

const company = {
  title: 'company',
  contents: [
    { href: '/#', item: 'About Teamwork' },
    { href: '/#', item: 'LeaderShip' },
    { href: '/#', item: 'Careers' },
    { href: '/#', item: 'Security' },
    { href: '/#', item: 'News' },
    { href: '/#', item: 'Brand' },
    { href: '/#', item: 'Affiliate program' },
    { href: '/#', item: 'Partner program' },
    { href: '/#', item: 'Contact us' },
    { href: '/#', item: 'Support Center' },
    { href: '/#', item: 'Startups' }
  ]
};

const product = {
  title: 'product',
  contents: [
    { href: '/#', item: 'Teamwork Desk' },
    { href: '/#', item: 'Teamwork Chat' },
    { href: '/#', item: 'Teamwork Spaces' },
    { href: '/#', item: 'Teamwork CRM' },
    { href: '/#', item: 'View all products' },
    { href: '/#', item: 'Integrations' },
    { href: '/#', item: 'Roadmap' },
    { href: '/#', item: 'Status' },
    { href: '/#', item: 'API' }
  ]
};

const solution = {
  title: 'product',
  contents: [
    { href: '/#', item: 'Remote work' },
    { href: '/#', item: 'Marketing agency' },
    { href: '/#', item: 'Marketing teams' },
    { href: '/#', item: 'Product teams' },
    { href: '/#', item: 'Professional services' },
    { href: '/#', item: 'Product development' },
    { href: '/#', item: 'Work management' }
  ]
};

const resources = {
  title: 'resources',
  contents: [
    { href: '/#', item: 'Blog' },
    { href: '/#', item: 'Project management guild' },
    { href: '/#', item: 'Project timeline guild' },
    { href: '/#', item: 'Project schedule guild' },
    { href: '/#', item: 'Product launch template' },
    { href: '/#', item: 'Software launch plan' },
    { href: '/#', item: 'Event marketing template' },
    { href: '/#', item: 'Creative request form' }
  ]
};

const compare = {
  title: 'compare',
  contents: [
    { href: '/#', item: 'Teamwork vs Asana' },
    { href: '/#', item: 'Teamwork vs Monday' },
    { href: '/#', item: 'Teamwork vs Wrike' },
    { href: '/#', item: 'Teamwork vs Trello' },
    { href: '/#', item: 'Teamwork vs Smartsheet' },
    { href: '/#', item: 'Teamwork vs MS Planner' },
    { href: '/#', item: 'Teamwork vs Basecamp' },
    { href: '/#', item: 'Teamwork vs ClickUp' }
  ]
};

export default function servicesTabs() {
  return (
    <div className={styles.servicesList}>
      <Tab services={company} />
      <Tab services={product} />
      <Tab services={solution} />
      <Tab services={resources} />
      <Tab services={compare} />
    </div>
  );
}
