import React from 'react';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import BacklogSection from './BacklogSection/BacklogSection';
import SprintSection from './SprintSection/SprintSection';

export default function BacklogPage() {
  // WIP fetch data from backend and pass donw

  return (
    <DashboardLayout>
      <div>
        <h1>Backlog</h1>
      </div>
      <SprintSection />
      <BacklogSection />
    </DashboardLayout>
  );
}
