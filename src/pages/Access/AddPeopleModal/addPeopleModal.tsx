/* eslint-disable consistent-return */
import React, { useRef } from 'react';
import style from './addPeopleModal.module.scss';
import search from '../AccessSearchBar/img/search-line.svg';
import dropDownArrow from './svg/arrow-drop-down-line.svg';
import { Iprops } from '../typings';

export default function AddPeopleModal({ cancelClick, addClick, memberList }: Iprops) {
  const handleAddInputRef = useRef<HTMLInputElement>(null);

  const handleAddClick = (): void => {
    const val: string = handleAddInputRef.current?.value.trim() ?? '';

    if (val.length) {
      const isExist = memberList.find((member) => member.name === val);
      if (isExist) {
        // eslint-disable-next-line no-alert
        return alert('The name already exists, please change your name!');
      }

      addClick({
        id: new Date().getTime(),
        name: val
      });
      // eslint-disable-next-line
      handleAddInputRef.current!.value = '';
    }
  };

  return (
    <div className={style.container}>
      <div className={style.dialog}>
        <header>
          <h1>Add people</h1>
        </header>
        <div className={style.bodyContent}>
          <div className={style.inputContent}>
            <input
              type="text"
              name="input"
              className={style.inputRight}
              placeholder="Type a name, group or email address"
              ref={handleAddInputRef}
            />
            <img className={style.inputImg} src={search} alt="search" />
          </div>
          <div className={style.roleContent}>
            <span>Role</span>
            <div className={style.inputContent}>
              <button className={style.inputRight} type="button">
                Member
              </button>
              <img className={style.inputImg} src={dropDownArrow} alt="search" />
            </div>
          </div>
        </div>
        <footer>
          <div className={style.footerContent}>
            <button className={style.cancelButton} type="button" onClick={cancelClick}>
              <span>Cancel</span>
            </button>
            <button className={style.addButton} type="button" onClick={handleAddClick}>
              <span>Add</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
