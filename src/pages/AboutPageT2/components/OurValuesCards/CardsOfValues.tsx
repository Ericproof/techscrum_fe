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
      description: 'We’re open, trustworthy and down to earth',
      imageLink:
        'https://website-assets.teamwork.com/offload/app/uploads/2019/02/22131716/value-open.svg',
      altInfo: 'girl eat apple'
    },
    {
      description: 'We’re open, trustworthy and down to earth',
      imageLink:
        'https://website-assets.teamwork.com/offload/app/uploads/2019/02/22131716/value-open.svg',
      altInfo: 'girl eat apple'
    },
    {
      description: 'We’re open, trustworthy and down to earth',
      imageLink:
        'https://website-assets.teamwork.com/offload/app/uploads/2019/02/22131716/value-open.svg',
      altInfo: 'girl eat apple'
    },
    {
      description: 'We’re open, trustworthy and down to earth',
      imageLink:
        'https://website-assets.teamwork.com/offload/app/uploads/2019/02/22131716/value-open.svg',
      altInfo: 'girl eat apple'
    },
    {
      description: 'We’re open, trustworthy and down to earth',
      imageLink:
        'https://website-assets.teamwork.com/offload/app/uploads/2019/02/22131716/value-open.svg',
      altInfo: 'girl eat apple'
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
            <div className={styles.card}>
              <span className={styles.cardDescription}>{card.description}</span>
              <img className={styles.cardImg} src={card.imageLink} alt={card.altInfo} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
