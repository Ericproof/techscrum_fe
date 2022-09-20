import React, { useState } from 'react';
import { FaRegPlusSquare, FaRegMinusSquare } from 'react-icons/fa';
import styles from './FAQComponent.module.scss';

interface Imember {
  title: string;
  content: string;
}

export default function FAQComponent(props: Imember) {
  const { title, content } = props;
  const [display, setDisplay] = useState(false);
  const icon = display ? (
    <FaRegMinusSquare className={styles.PlusIcon} />
  ) : (
    <FaRegPlusSquare className={styles.PlusIcon} />
  );

  function toggleDisplay() {
    setDisplay(!display);
  }

  return (
    <>
      <div
        className={styles.FAQDetailes}
        role="button"
        tabIndex={0}
        onClick={() => {
          toggleDisplay();
        }}
        onKeyDown={(event) => {
          if (event.keyCode === 40) {
            toggleDisplay();
          }
        }}
      >
        <div className={styles.Qcontainer}>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <div className={styles.IconContainer}>{icon}</div>
      </div>
      <hr className={styles.breaker} />
      <div className={display ? styles.expand : styles.hide}>
        <p>{content}</p>
      </div>
    </>
  );
}
