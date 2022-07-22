import React, { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import styles from './LabelFields.module.scss';

interface IPropsLabel {
  labels: any;
  onChangeFilterLabel: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSaveLabel: () => void;
}

export default function LabelFields(props: IPropsLabel) {
  const { labels, onChangeFilterLabel, onClickSaveLabel } = props;
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

  const addLabelToSelectedTaskLabelList = (label: any) => {
    setSelectedTaskLabelList(selectedTaskLabelList.concat(label));
  };

  // const onChangeFilterLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.value) {
  //     // setDropDownTaskList();
  //     return;
  //   }
  //   setDropDownTaskList(
  //     dropDownTaskList.filter((label: any) => {
  //       return label.name?.toLowerCase().includes(e.target.value.toLowerCase());
  //     })
  //   );
  // };

  return (
    <div ref={myRef} className={styles.label}>
      <div>Labels</div>
      <div className={styles.labelDropdownContainer}>
        {visible ? (
          <div className={styles.labelDropdownOpen}>
            <div className={styles.labelOptions}>
              {selectedTaskLabelList.map((item: any) => {
                return (
                  <div className={styles.labels}>
                    <span key={item.id}>{item.name}</span>
                    <TiDelete
                      onClick={() => {
                        removeLabelFromSelectedTaskList(item);
                      }}
                    />
                  </div>
                );
              })}
              <input onChange={onChangeFilterLabel} />
            </div>
            <div className={styles.labelMenu}>
              <ul>
                {dropDownTaskList.map((label: any) => (
                  <li key={label.id}>
                    <button
                      type="button"
                      onClick={() => {
                        addLabelToSelectedTaskLabelList(label);
                      }}
                    >
                      <span>{label.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={onClickSaveLabel}>
                <span>input value</span>
              </button>
            </div>
          </div>
        ) : (
          <button className={styles.labelInputClose} type="button" onClick={handleClickOutside}>
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
