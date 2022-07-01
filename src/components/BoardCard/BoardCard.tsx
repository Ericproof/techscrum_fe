import React from 'react';
import CardHeader from './CardHeader/CardHeader';
import CardLeftContent from './CardLeftContent/CardLeftContent';
import CardRightContent from './CardRightContent/CardRightContent';
import styles from './BoardCard.module.scss';

export default function BoardCard() {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <CardHeader />
        <div className={styles.cardContent}>
          <CardLeftContent />
          <CardRightContent />
        </div>
      </div>
    </div>
  );
}
