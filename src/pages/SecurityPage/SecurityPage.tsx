/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console, no-control-regex */
import React from 'react';
import styles from './SecurityPage.module.scss';
import Top from './components/Top/Top';
import Card from './components/Card/Card';
import Certifications from './components/Certifications/Certifications';
import Partners from './components/Partners/Partners';
import FAQ from './components/FAQ/FAQ';
import Teamwork from './components/Teamwork/Teamwork';

export default function SecurityPage() {
  return (
    <div>
      <Top />
      <Card />
      <Certifications />
      <Partners />
      <FAQ />
      <Teamwork />
    </div>
  );
}
