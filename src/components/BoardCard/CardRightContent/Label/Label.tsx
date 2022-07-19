import React, { useEffect, useState } from 'react';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import styles from './Label.module.scss';

interface IPropsLabel {
  labels: any;
}

export default function Label(props: IPropsLabel) {
  const { labels } = props;
  const [selectedTaskLabelList, setSelectedTaskLabelList] = useState([labels[0]]);
  const [dropDownTaskList, setDropDownTaskList] = useState(labels);
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const handleClickOutside = () => setVisible(true);

  useEffect(() => {
    const labelNames = selectedTaskLabelList.map((item) => {
      return item.name;
    });

    setDropDownTaskList(
      labels.filter((item: any) => {
        return !labelNames.includes(item.name);
      })
    );
  }, [labels, selectedTaskLabelList]);

  const removeLabelFromSelectedTaskList = (label: any) => {
    setSelectedTaskLabelList(selectedTaskLabelList.filter((item) => item.name !== label.name));
  };

  const addLabelsSelectedTaskLabelList = (label: any) => {
    setSelectedTaskLabelList(selectedTaskLabelList.concat(label));
  };

  return (
    <div ref={myRef} className={styles.label}>
      <div>Labels</div>
      <div className={styles.leadDropdownContainer}>
        {visible ? (
          <div className={styles.leadDropdownOpen}>
            <div className={styles.leadInputField}>
              {selectedTaskLabelList.map((item: any) => {
                return (
                  <button
                    key={item.id}
                    id={item.id}
                    onClick={() => {
                      removeLabelFromSelectedTaskList(item);
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
                {dropDownTaskList.map((label: any) => (
                  <li key={label.id}>
                    <button
                      type="button"
                      onClick={() => {
                        addLabelsSelectedTaskLabelList(label);
                      }}
                    >
                      <span>{label.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <button className={styles.leadInputClose} type="button" onClick={handleClickOutside}>
            {selectedTaskLabelList.map((item: any) => {
              return (
                <span key={item.id} id={item.id}>
                  {item.name}
                </span>
              );
            })}
          </button>
        )}
      </div>
    </div>
  );
}
