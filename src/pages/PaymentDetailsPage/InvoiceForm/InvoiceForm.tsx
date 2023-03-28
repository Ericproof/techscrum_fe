import React, { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import EmailInput from '../EmailInput/EmailInput';
import styles from './InvoiceForm.module.scss';

interface Props {
  invoiceEmail: string;
  setInvoiceEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default function InvoiceForm({ invoiceEmail, setInvoiceEmail }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  // State getting from child
  const handleValueChange = (newValue: string) => {
    setValue(newValue);
  };

  // State getting from child
  const handleValidChange = (isFormValid: boolean) => {
    setIsValid(isFormValid);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing((prev) => !prev);
    if (isEditing) {
      setInvoiceEmail(value);
      toast.success('Email updated successfully.', { theme: 'colored', autoClose: 2000 });
    }
  };

  const btnClassName = isValid
    ? `${styles.pageBtn}`
    : `${styles.pageBtn} ${styles.pageBtn__disabled}`;

  return (
    <form className={styles.invoice__form} onSubmit={onSubmit}>
      <span className={styles.textSecondary}>Send copies of invoices to</span>
      <EmailInput
        isEditing={isEditing}
        invoiceEmail={invoiceEmail}
        onValueChange={handleValueChange}
        onValidChange={handleValidChange}
      />
      <button className={btnClassName} type="submit" disabled={!isValid}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </form>
  );
}
