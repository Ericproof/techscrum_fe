import React, { useEffect, useRef, useState } from 'react';
import styles from './BoardSearch.module.scss';
import search from './img/search-line.svg';
import avatar1 from './img/image/E-0.png';
import avatar2 from './img/image/RL-2.png';
import avatar3 from './img/image/EL-3.png';
import avatar4 from './img/image/SQ-4.png';

interface Props {
  updateIsCreateNewCard: () => void;
}
export default function BoardSearch({ updateIsCreateNewCard }: Props) {
  const avatars = [
    { id: 1, name: 'avatar1', url: avatar1 },
    { id: 2, name: 'avatar2', url: avatar2 },
    { id: 3, name: 'avatar3', url: avatar3 },
    { id: 4, name: 'avatar4', url: avatar4 }
  ];

  const [activeAvatarsID, setActiveAvatarsID] = useState<number>();
  const [activeAvatars, setActiveAvatars] = useState<boolean>(false);

  const [inputState, setInputState] = useState<boolean>(false);
  const myRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;

    const val: string = myRef.current?.value.trim() ?? '';

    if (!val.length && myRef.current !== null && !myRef.current.contains(target)) {
      setInputState(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });

  return (
    <div className={styles.boardSearchSection}>
      <div className={styles.container}>
        <div
          className={
            inputState
              ? `${styles.inputContainer} ${styles.inputContainerPlus}`
              : styles.inputContainer
          }
        >
          <input
            type="text"
            name="search"
            ref={myRef}
            placeholder={inputState ? 'Search this board' : ''}
            onClick={() => {
              setInputState(true);
            }}
          />
          <span>
            <img className={styles.inputImg} src={search} alt="search" />
          </span>
        </div>
        <fieldset>
          <ul className={styles.avatarContainer} id="myList">
            {avatars.map((avatar) => (
              <li
                onClick={() => {
                  setActiveAvatarsID(avatar.id);
                  setActiveAvatars(!activeAvatars);
                }}
                aria-hidden="true"
                key={avatar.id}
              >
                <img
                  src={avatar.url}
                  alt={avatar.name}
                  className={
                    activeAvatarsID === avatar.id
                      ? (activeAvatars && `${styles[avatar.name]} ${styles.active}`) ||
                        styles[avatar.name]
                      : styles[avatar.name]
                  }
                />
              </li>
            ))}
            <li>
              <button className={styles.avatarButton} type="button">
                <div>+3</div>
              </button>
            </li>
            <li className={styles.roleLayout}>
              <button type="button">
                <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
                    <g fill="currentColor" fillRule="evenodd">
                      <rect x="18" y="5" width="2" height="6" rx="1" />
                      <rect x="16" y="7" width="6" height="2" rx="1" />
                      <path d="M5 14c0-1.105.902-2 2.009-2h7.982c1.11 0 2.009.894 2.009 2.006v4.44c0 3.405-12 3.405-12 0V14z" />
                      <circle cx="11" cy="7" r="4" />
                    </g>
                  </svg>
                </span>
              </button>
            </li>
          </ul>
        </fieldset>
      </div>
      <button type="button" className={styles.createButton} onClick={updateIsCreateNewCard}>
        Create card
      </button>
    </div>
  );
}
