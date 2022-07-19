import React, { useState } from 'react';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import styles from './Label.module.scss';

interface IPropsLabel {
  labels: any;
}

export default function Label(props: IPropsLabel) {
  const { labels } = props;
  const [selectedTaskLabelList, setSelectedTaskLabelList] = useState([labels[0], labels[1]]);
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const handleClickOutside = () => setVisible(true);

  return (
    <div ref={myRef} className={styles.label}>
      <div>Labels</div>
      <div className={styles.leadDropdownContainer}>
        {visible ? (
          <div className={styles.leadDropdownOpen}>
            <div className={styles.leadInputField}>
              {selectedTaskLabelList.map((item: any) => {
                // show delete button, onClickRemove from selectedTaskLabelList;
                return <span>{item.name}</span>;
              })}
              <button className={styles.optionToggle} type="button" onClick={handleClickOutside}>
                <i role="button" aria-label="openDropdown" tabIndex={0} />
              </button>
            </div>
            <div className={styles.leadMenu}>
              <ul>
                {labels
                  .filter((item) => {
                    return true;
                  })
                  .map((tag: any) => (
                    <li key={tag.id}>
                      <button
                        type="button"
                        onClick={() => {
                          // get old  selectedTaskLabelList list
                          // newlist = append the item to old selectedTaskLabelList list
                          // setSelectedTaskLabelList
                          setVisible(false);
                        }}
                      >
                        <span>{tag.name}</span>
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ) : (
          <button className={styles.leadInputClose} type="button" onClick={handleClickOutside}>
            {selectedTaskLabelList.map((item: any) => {
              return <span>{item.name}</span>;
            })}
          </button>
        )}
      </div>
    </div>
  );
}
