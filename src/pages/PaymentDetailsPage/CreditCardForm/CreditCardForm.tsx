import React, { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import styles from './CreditCardForm.module.scss';

interface Props {
  cardDetails: {
    type: string;
    holder: string;
    number: string;
    expiry: string;
  };
}

export default function CreditCardForm({ cardDetails }: Props) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <form className={styles.creditCard__container}>
      <h4>Credit card direct debit account details for contributions</h4>
      <h5 className={styles.flexAlign}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className={styles.creditCard__checkBox}
        />
        <span>Change my credit card details</span>
      </h5>
      <div className={styles.creditCard}>
        <div className={styles.creditCard__grid__item}>
          <h4>Card type:</h4>
          <p className={`${styles.creditCard__inputBox} ${styles.creditCard__inputBox__wide}`}>
            {cardDetails.type}{' '}
            <RiArrowDropDownLine className={styles.dropDownIcon} fontSize="20px" />
          </p>
        </div>
        <div className={styles.creditCard__grid__item}>
          <h4>Cardholder name:</h4>
          <input
            className={styles.creditCard__inputBox}
            type="text"
            value="df"
            onChange={() => {}}
            disabled={!isChecked}
          />
        </div>
        <div className={styles.creditCard__grid__item}>
          <h4>Card number:</h4>
          <p className={styles.creditCard__inputBox}>{`${cardDetails.number.slice(
            0,
            4
          )}*****${cardDetails.number.slice(-3)}`}</p>
        </div>
        <div className={styles.creditCard__grid__item}>
          <h4>Card expiry:</h4>
          <p className={styles.creditCard__inputBox}>{cardDetails.expiry}</p>
        </div>
      </div>
      <button className={styles.cardUpdateBtn}>Update</button>
    </form>
  );
}
