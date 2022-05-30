import React, { useCallback, useEffect, useState } from 'react';
import style from './index.module.scss';
import Header from './AccessHeader/accessHeader';
import SearchBar from './AccessSearchBar/accessSearchBar';
import Main from './AccessMain/accessMain';
import Modal from './AddPeopleModal/addPeopleModal';
import { IMember } from './typings';

export default function AccessPage() {
  const [modal, setModal] = useState(false);
  const [memberList, setMemberList] = useState<IMember[]>([]);

  const modalStateClick = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const addClick = useCallback((member: IMember) => {
    setMemberList((memberLists: IMember[]) => [...memberLists, member]);
  }, []);

  const removeClick = useCallback((id: number) => {
    setMemberList((memberLists: IMember[]) =>
      memberLists.filter((member: IMember) => member.id !== id)
    );
  }, []);

  useEffect(() => {}, [modal, memberList]);

  return (
    <>
      {modal && <Modal cancelClick={modalStateClick} addClick={addClick} memberList={memberList} />}
      <div className={style.container}>
        <Header modalStateClick={modalStateClick} />
        <br />
        <br />
        <SearchBar />
        <Main removeClick={removeClick} memberList={memberList} />
      </div>
    </>
  );
}
