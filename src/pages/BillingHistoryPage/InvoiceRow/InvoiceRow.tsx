import React from 'react';
import logo from '../../../assets/small-logo.svg';
import styles from './InvoiceRow.module.scss';

interface InvoiceRowProps {
  invoice: any;
}

const formatTimeStamp = (date: string): string => {
  const planDate = new Date(date);
  const formattedDate = planDate.toLocaleDateString('en-AU', {
    year: '2-digit',
    month: 'short',
    day: 'numeric'
  });
  return formattedDate;
};

export default function InvoiceRow(props: InvoiceRowProps) {
  const { invoice } = props;
  const { planName, amount, startDate, endDate, invoiceURL } = invoice;

  return (
    <tr className={styles.tableRow}>
      <td className={styles.product}>
        <img src={logo} alt="logo" className={styles.logoIcon} />
        <span>Techscrum Product</span>
      </td>
      <td>{planName}</td>
      <td>${amount}</td>
      <td>
        {formatTimeStamp(startDate)} - {formatTimeStamp(endDate)}
      </td>
      <td>
        {invoiceURL && (
          <a href={invoiceURL} download className={styles.invoiceBtn}>
            View
          </a>
        )}
      </td>
    </tr>
  );
}
