import React, { useState } from 'react';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import styles from './Label.module.scss';

interface IPropsLabel {
  labels: any;
}

export default function Label(props: IPropsLabel) {
  const { labels } = props;
  const [selectedTaskLabelList, setSelectedTaskLabelList] = useState([labels[0]]);
  const [unselectedTaskList, setUnSelectedTaskLabelList] = useState([labels]);
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const handleClickOutside = () => setVisible(true);

  const removeLabelFromSelectedTaskList = (e: any) => {
    const removedTaskLabel = [e.innerHTML];
    setSelectedTaskLabelList(
      selectedTaskLabelList.filter((item) => item.name !== removedTaskLabel)
    );
    setUnSelectedTaskLabelList(unselectedTaskList.concat(removedTaskLabel));
  };

  const addLabelsSelectedTaskLabelList = (e: any) => {
    const addedTaskLabel = [e.innerHTML];
    setSelectedTaskLabelList(selectedTaskLabelList.concat(addedTaskLabel));
    setUnSelectedTaskLabelList(unselectedTaskList.filter((item) => item.name !== addedTaskLabel));
  };

  return (
    <div ref={myRef} className={styles.label}>
      <div>Labels</div>
      <div className={styles.leadDropdownContainer}>
        {visible ? (
          <div className={styles.leadDropdownOpen}>
            <div className={styles.leadInputField}>
              {selectedTaskLabelList.map((item: any) => {
                // show delete button, onClickRemove from selectedTaskLabelList;
                return (
                  <button
                    id={item.id}
                    onClick={(e) => {
                      removeLabelFromSelectedTaskList(e);
                    }}
                  >
                    {item.name}
                  </button>
                );
              })}
              <button className={styles.optionToggle} type="button" onClick={handleClickOutside}>
                <i role="button" aria-label="openDropdown" tabIndex={0} />
              </button>
            </div>
            <div className={styles.leadMenu}>
              <ul>
                {unselectedTaskList
                  // .filter((item: any) => {
                  //   return true;
                  // })
                  .map((tag: any) => (
                    <li key={tag.id}>
                      <button
                        type="button"
                        onClick={(e) => {
                          // get old  selectedTaskLabelList list
                          // newlist = append the item to old selectedTaskLabelList list
                          // setSelectedTaskLabelList
                          addLabelsSelectedTaskLabelList(e);
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
              return <span id={item.id}>{item.name}</span>;
            })}
          </button>
        )}
      </div>
    </div>
  );
}
