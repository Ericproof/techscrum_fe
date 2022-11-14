import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import styles from './StatusBtn.module.scss';
import Button from '../../../components/Button/Button';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import { IStatusBacklog } from '../../../types';

interface IToolBar {
  status: string;
  taskId: string;
  statusData: IStatusBacklog[];
  onClickChangeStatus: (id: string, statusId: string) => void;
}
export default function StatusBtn({ status, onClickChangeStatus, taskId, statusData }: IToolBar) {
  const { visible, setVisible, myRef } = useOutsideAlerter(false);

  const dropDownClick = () => {
    setVisible(!visible);
  };
  const btnClick = (statusId: string) => {
    setVisible(false);
    onClickChangeStatus(taskId, statusId);
  };

  return (
    <div className={styles.statusBtnContainer} ref={myRef}>
      <Button
        icon={<FaChevronDown />}
        iconPosition="end"
        overrideStyle={[styles.statusBtn, styles.dropDownBtnPurple].join(' ')}
        onClick={dropDownClick}
      >
        {status}
      </Button>
      <div
        className={
          visible
            ? [styles.btnDropDownContainer, styles.showBtnDropDownContainer].join(' ')
            : styles.btnDropDownContainer
        }
      >
        <ul className={styles.btnDropDownListContainer}>
          {statusData.map((btnInfo) => {
            return (
              <li key={btnInfo.name}>
                <Button
                  overrideStyle={[styles.statusBtn, styles.dropDownBtnPurple].join(' ')}
                  onClick={() => {
                    btnClick(btnInfo.id);
                  }}
                >
                  {btnInfo.name.toUpperCase()}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
