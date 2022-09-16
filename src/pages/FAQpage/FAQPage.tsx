import React from 'react';
import FAQheader from './components/FAQheader/FAQheader';
import FAQicons from './components/FAQicons/FAQicons';
import FAQdetails from './components/FAQdetails/FAQdetails';

export default function FAQPage() {
  const getStarted = [
    'Inviting People to Your Teamwork Site',
    'Creating a Task List',
    'Tasks',
    'Adding Tasks in List View',
    'Companies - Owner and External',
    'Adding a Message',
    'Adding a Project',
    'Uploading Files in the Files Area',
    'Adding People to a Project',
    'Task Lists'
  ];
  const usingTeamwork = [
    'Inviting People to Your Teamwork Site',
    'Adding a Project',
    'Projects List View',
    'Creating a Task List',
    'Teamwork User License Types',
    'Adding Tasks in List View',
    'Understanding User Permissions and Access',
    "Updating Your Own and Other Users' Profile Preferences",
    'Companies - Owner and External',
    'Creating a Notebook'
  ];

  return (
    <div>
      <FAQheader />
      <FAQicons />
      <FAQdetails links={getStarted} title="Getting Started" />
      <FAQdetails links={usingTeamwork} title="Using Teamwork" />
      <FAQdetails links={getStarted} title="Working with Your Projects" />
      <FAQdetails links={getStarted} title="Integrations" />
      <FAQdetails links={getStarted} title="Teamwork Tips" />
      <FAQdetails links={getStarted} title="Teamwork Settings" />
      <FAQdetails links={getStarted} title="Planning and Managing Work" />
      <FAQdetails links={getStarted} title="Pricing and Billing" />
      <FAQdetails links={getStarted} title="Agency and Professional Services" />
    </div>
  );
}
