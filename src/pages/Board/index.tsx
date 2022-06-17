import React from 'react';
import style from './index.module.scss';
import BoardSearch from './BoardSearch/BoardSearch';
import BoardMain from './BoardMain/BoardMain';
import ProjectHeader from '../../components/ProjectHeader/ProjectHeader';

export default function Board() {
  return (
    <div className={style.container}>
      <ProjectHeader />
      <BoardSearch />
      <BoardMain />
    </div>
  );
}
