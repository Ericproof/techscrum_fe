import React from 'react';
import logo from '../../../assets/small-logo.svg';
import styles from './InvoiceRow.module.scss';

type Props = {
  invoice: {
    id: number;
    product: string;
    plan: string;
    amount: number;
    start: number;
    end: number;
    invoiceUrl: string;
  };
};

const formatTimeStamp = (stamp: number): string => {
  const date = new Date(stamp * 1000);
  const formattedDate = date.toLocaleDateString('en-AU', {
    year: '2-digit',
    month: 'short',
    day: 'numeric'
  });
  return formattedDate;
};

export default function InvoiceRow(props: Props) {
  const {
    invoice: { product, plan, amount, start, end, invoiceUrl }
  } = props;
  return (
    <tr className={styles.tableRow}>
      <td className={styles.product}>
        <img src={logo} alt="logo" className={styles.logoIcon} />
        <span>{product}</span>
      </td>
      <td>{plan}</td>
      <td>${amount}</td>
      <td>
        {formatTimeStamp(start)} - {formatTimeStamp(end)}
      </td>
      <td>
        {invoiceUrl && (
          <a href={invoiceUrl} download className={styles.invoiceBtn}>
            View
          </a>
        )}
      </td>
    </tr>
  );
}
