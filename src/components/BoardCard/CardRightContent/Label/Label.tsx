import React, { useState } from 'react';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import styles from './Label.module.scss';

const tags = [
  {
    id: '1',
    tag: 'None'
  },
  {
    id: '2',
    tag: 'Frontend'
  },
  {
    id: '3',
    tag: 'Backend'
  }
];

export default function Label() {
  const [userInfo, setUserInfo] = useState(tags[0]);
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const handleClickOutside = () => setVisible(true);
  return (
    <div ref={myRef} className={styles.label}>
      <div>Labels</div>
      <div className={styles.leadDropdownContainer}>
        {visible ? (
          <div className={styles.leadDropdownOpen}>
            <div className={styles.leadInputField}>
              <span>{userInfo.tag}</span>
              <button className={styles.optionToggle} type="button" onClick={handleClickOutside}>
                <i role="button" aria-label="openDropdown" tabIndex={0} />
              </button>
            </div>
            <div className={styles.leadMenu}>
              <ul>
                {tags.map((tag) => (
                  <li key={tag.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setUserInfo({ id: tag.id, tag: tag.tag });
                        //   onChange({ target: { name: 'projectLeadId', value: user.id } });
                        setVisible(false);
                      }}
                    >
                      <span>{tag.tag}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <button className={styles.leadInputClose} type="button" onClick={handleClickOutside}>
            <span>{userInfo.tag}</span>
          </button>
        )}
      </div>
    </div>
  );
}
