import React from 'react';
import MainMenuV2 from '../MainMenuV2/MainMenuV2';
import SubSettingMenu from '../../lib/SubSettingMenu/SubSettingMenu';
import InvoiceRow from './InvoiceRow/InvoiceRow';
import styles from './BillingHistoryPage.module.scss';
import folder from '../../assets/billingFolder.svg';

const invoiceData = [
  {
    id: 1,
    product: 'TechScrum Access',
    plan: 'Free plan',
    amount: 0,
    start: 1669876538,
    end: 1672468538,
    invoiceUrl: ''
  },
  {
    id: 2,
    product: 'TechScrum Access',
    plan: 'Free trial',
    amount: 0,
    start: 1672554938,
    end: 1673073338,
    invoiceUrl:
      'https://schoolsequella.det.nsw.edu.au/file/c485bd4e-cb57-4daf-862c-0d819ee72a68/1/reading-sample-test-questions.pdf'
  },
  {
    id: 3,
    product: 'TechScrum Access',
    plan: 'Advanced plan',
    amount: 49,
    start: 1673159738,
    end: 1675838138,
    invoiceUrl:
      'https://schoolsequella.det.nsw.edu.au/file/c485bd4e-cb57-4daf-862c-0d819ee72a68/1/reading-sample-test-questions.pdf'
  }
];

export default function BillingHistoryPage() {
  return (
    <div className={styles.pageContainer}>
      <MainMenuV2 />
      <SubSettingMenu />
      <div className={styles.sectionContainer}>
        <h2>Billing history</h2>
        <img src={folder} alt="folder" className={styles.folderImg} />
        {invoiceData?.length > 0 ? (
          <table>
            <thead className={styles.tableRow}>
              <tr className={styles.tableRow}>
                <th className={styles.tableHeader}>Product</th>
                <th className={styles.tableHeader}>Plan</th>
                <th className={styles.tableHeader}>Amount</th>
                <th className={styles.tableHeader}>Period</th>
                <th className={styles.tableHeader}>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.map((e) => (
                <InvoiceRow key={e.id} invoice={e} />
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className={styles.textCenter}>You currently have no bills</h2>
        )}
      </div>
    </div>
  );
}
