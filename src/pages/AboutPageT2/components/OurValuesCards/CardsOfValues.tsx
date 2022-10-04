import React from 'react';
import styles from './CardsOfValues.module.scss';

export default function CardsOfValues() {
  const cardsDetails = [
    {
      description: 'We’re open, trustworthy and down to earth',
      imageLink:
        'https://website-assets.teamwork.com/offload/app/uploads/2019/02/22131716/value-open.svg',
      altInfo: 'girl eat apple'
    }
  ];
  return (
    <section className={styles.container}>
      <h1>Our Values</h1>
      <p>
        No matter what size our business grows to, these are the values that guide our decision
        making everyday
      </p>

      {cardsDetails.map((card) => {
        return (
          <div className={styles.card}>
            <span className={styles.cardDescription}>{card.description}</span>
            <img className={styles.cardImg} src={card.imageLink} alt={card.altInfo} />
          </div>
        );
      })}

      <div className={styles.card}>
        <span className={styles.cardDescription}>We’re passionate about what we do</span>
        <img
          className={styles.cardImg}
          src="https://website-assets.teamwork.com/offload/app/uploads/2019/02/22131716/value-passionate.svg"
          alt="boy use phone"
        />
      </div>
      <div className={styles.card}>
        <span className={styles.cardDescription}>We put our customers first</span>
        <img
          className={styles.cardImg}
          src="https://website-assets.teamwork.com/offload/app/uploads/2019/02/22131716/value-customers.svg"
          alt="girl with medal"
        />
      </div>
      <div className={styles.card}>
        <span className={styles.cardDescription}>We strive for excellence</span>
        <img
          className={styles.cardImg}
          src="https://website-assets.teamwork.com/offload/app/uploads/2019/02/22131717/value-strive-excellence.svg"
          alt="medal"
        />
      </div>
      <div className={styles.card}>
        <span className={styles.cardDescription}>We’re results driven</span>
        <img
          className={styles.cardImg}
          src="https://website-assets.teamwork.com/offload/app/uploads/2019/02/22131717/value-results-driven.svg"
          alt="bar chart"
        />
      </div>
      <div className={styles.card}>
        <span className={styles.cardDescription}>We value teamwork</span>
        <img
          className={styles.cardImg}
          src="https://website-assets.teamwork.com/offload/app/uploads/2019/02/22131717/value-teamwork.svg"
          alt="shake hands"
        />
      </div>
    </section>
  );
}
