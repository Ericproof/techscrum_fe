import React from 'react';
import CardHeader from './CardHeader/CardHeader';
import CardLeftContent from './CardLeftContent/CardLeftContent';
import CardRightContent from './CardRightContent/CardRightContent';
import style from './BoardCard.module.scss';

export default function Card() {
  return (
    <div className={style.background}>
      <div className={style.container}>
        <CardHeader />
        <div className={style.cardContent}>
          <CardLeftContent />
          <CardRightContent />
        </div>
      </div>
    </div>
  );
}
