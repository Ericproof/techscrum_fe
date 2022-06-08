import React from 'react';
import style from './index.module.scss';
import BoardSearch from './BoardSearch/BoardSearch';
import BoardMain from './BoardMain/BoardMain';

export default function Board() {
  return (
    <div className={style.container}>
      <BoardSearch />
      <BoardMain />
    </div>
  );
}
