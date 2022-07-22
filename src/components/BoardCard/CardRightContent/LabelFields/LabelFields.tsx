/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { createLabel } from '../../../../api/label/label';
import { updateTask } from '../../../../api/task/task';
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
  const [inputLabel, setInputLabel] = useState<string>('');
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
  const onClickSave = async () => {
    const res: any = await createLabel({ name: inputLabel, slug: inputLabel.replace(' ', '-') });
    if (!res.data) {
      return;
    }
    onClickSaveLabel();
    addLabelToSelectedTaskLabelList(res.data);
    setInputLabel('');
  };

  const onChangeInputLabel = (e: any) => {
    setInputLabel(e.target.value);
    onChangeFilterLabel(e);
  };
  const hasItem = dropDownTaskList.length > 0;
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
              <input onChange={onChangeInputLabel} value={inputLabel} />
            </div>
            <div className={styles.labelMenu}>
              <ul>
                {!hasItem && inputLabel === '' && <li>No result</li>}
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
                {inputLabel && inputLabel !== '' && (
                  <li>
                    <button type="button" onClick={onClickSave}>
                      <span>{inputLabel} (New Label)</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>
            )
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
