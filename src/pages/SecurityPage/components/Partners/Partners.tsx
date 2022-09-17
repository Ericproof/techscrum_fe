import React from 'react';
import styles from './SecurityPage.module.scss';
import Top from './components/Top/Top';
import Card from './components/Card/Card';
import Certifications from './components/Certifications/Certifications';

export default function SecurityPage() {
  return (
    <div>
      <Top />
      <Card />
      <Certifications />
    </div>
  );
}
