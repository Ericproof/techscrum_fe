/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { createLabel, deleteLabel } from '../../../../api/label/label';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import { TaskEntity } from '../../../../api/task/entity/task';
import styles from './LabelFields.module.scss';

interface IPropsLabel {
  labels: any;
  taskInfo: TaskEntity;
  // taskStatusOnchange: (taskInfo: TaskEntity) => void;
  onSave: (updatedTaskInfo: TaskEntity) => void;
  // onChangeFilterLabel: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSaveLabel: () => void;
}

export default function LabelFields(props: IPropsLabel) {
  const { labels, onClickSaveLabel, taskInfo, onSave } = props;
  const [selectedTaskLabelList, setSelectedTaskLabelList] = useState(taskInfo.tag);
  const [dropDownTaskList, setDropDownTaskList] = useState(labels);
  const [inputLabel, setInputLabel] = useState<string>('');
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const handleClickOutside = () => {
    setInputLabel('');
    setVisible(true);
  };

  useEffect(() => {
    const labelNames =
      selectedTaskLabelList === undefined
        ? []
        : selectedTaskLabelList.map((item) => {
            if (!item) {
              return '';
            }
            return item.name ?? '';
          });

    setDropDownTaskList(
      labels.filter((item: any) => {
        return !labelNames.includes(item.name);
      })
    );
  }, [labels, selectedTaskLabelList]);

  const removeLabelFromSelectedTaskList = async (label: any) => {
    if (!label.id) {
      try {
        await deleteLabel(label.id);
      } finally {
        // setSelectedTaskLabelList(selectedTaskLabelList.filter((item) => item.name !== label.name));
        const tag = labels;
        const updatedTaskInfo = { ...taskInfo, tag };
        onSave(updatedTaskInfo);
      }
    }
  };

  const addLabelToSelectedTaskLabelList = (label: any) => {
    console.log(label);

    // setSelectedTaskLabelList(selectedTaskLabelList.concat(label));
  };

  const onChangeFilterLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      return;
    }
    setDropDownTaskList(
      dropDownTaskList.filter((label: any) => {
        return label.name?.toLowerCase().includes(e.target.value.toLowerCase());
      })
    );
  };
  const onClickSave = async (label: string) => {
    if (!taskInfo.id) {
      return;
    }
    const res = await createLabel(taskInfo.id, {
      name: inputLabel || label,
      slug: inputLabel.replace(' ', '-') || label.replace(' ', '-')
    });
    if (!res.data) {
      return;
    }
    // console.log(res.data);

    onClickSaveLabel();
    addLabelToSelectedTaskLabelList({ ...res.data });
    // setSelectedTaskLabelList(label.concat(res.data));
    console.log(selectedTaskLabelList);
    setInputLabel('');
  };

  const onChangeInputLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
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
              {selectedTaskLabelList !== undefined &&
                selectedTaskLabelList.map((item: any) => {
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
                {!hasItem && inputLabel === '' && <li className={styles.noResult}>No result</li>}
                {dropDownTaskList.map((label: any) => (
                  <li key={label.id}>
                    <button
                      type="button"
                      onClick={() => {
                        addLabelToSelectedTaskLabelList(label);
                        setInputLabel('');
                        onClickSave(label.name);
                      }}
                    >
                      <span>{label.name}</span>
                    </button>
                  </li>
                ))}
                {inputLabel && inputLabel !== '' && (
                  <li>
                    <button type="button" onClick={() => onClickSave(inputLabel)}>
                      <span>{inputLabel} (New Label)</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <button className={styles.labelInputClose} type="button" onClick={handleClickOutside}>
            {selectedTaskLabelList !== undefined &&
              selectedTaskLabelList?.map((item: any) => {
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
