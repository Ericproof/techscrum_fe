import React from 'react';
import styles from './CardsOfValues.module.scss';

export default function CardsOfValues() {
  const cardsDetails = [
    {
      description: 'We’re open, trustworthy and down to earth',
      imageLink:
        'https://website-assets.teamwork.com/offload/app/uploads/2019/02/22131716/value-open.svg',
      altInfo: 'girl eat apple'
    },
    {
      description: 'We’re passionate about what we do',
      imageLink:
        'https://website-assets.teamwork.com/offload/app/uploads/2019/02/22131716/value-passionate.svg',
      altInfo: 'boy take photo'
    },
    {
      description: 'We put our customers first',
      imageLink:
        'https://website-assets.teamwork.com/offload/app/uploads/2019/02/22131716/value-customers.svg',
      altInfo: 'girl with medal'
    },
    {
      description: 'We strive for excellence',
      imageLink:
        'https://website-assets.teamwork.com/offload/app/uploads/2019/02/22131717/value-strive-excellence.svg',
      altInfo: 'medal'
    },
    {
      description: 'We’re results driven',
      imageLink:
        'https://website-assets.teamwork.com/offload/app/uploads/2019/02/22131717/value-results-driven.svg',
      altInfo: 'bar chart'
    },
    {
      description: 'We value teamwork',
      imageLink:
        'https://website-assets.teamwork.com/offload/app/uploads/2019/02/22131717/value-teamwork.svg',
      altInfo: 'shake hand'
    }
  ];
  return (
    <section className={[styles.container, styles.ourValuesContainer].join(' ')}>
      <h1>Our Values</h1>
      <p>
        No matter what size our business grows to, these are the values that guide our decision
        making everyday
      </p>
      <div className={styles.cardOfValuesContainer}>
        {cardsDetails.map((card) => {
          return (
            <div key={card.altInfo} className={styles.card}>
              <span className={styles.cardDescription}>{card.description}</span>
              <img className={styles.cardImg} src={card.imageLink} alt={card.altInfo} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
